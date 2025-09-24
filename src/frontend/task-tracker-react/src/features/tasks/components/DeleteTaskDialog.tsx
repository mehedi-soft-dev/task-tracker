import React from 'react';
import {
  DialogTrigger,
  AlertDialog,
  Button,
  Flex,
  Text
} from '@adobe/react-spectrum';
import { useMutation, graphql } from 'react-relay';
import Delete from '@spectrum-icons/workflow/Delete';

const DeleteTaskMutation = graphql`
  mutation DeleteTaskDialogMutation($id: UUID!) {
    deleteTask(id: $id)
  }
`;

interface DeleteTaskDialogProps {
  taskId: string;
  taskTitle: string;
  onSuccess?: () => void;
  children?: React.ReactElement;
}

export const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  taskId,
  taskTitle,
  onSuccess,
  children
}) => {
  const [commit, isInFlight] = useMutation(DeleteTaskMutation);

  const handleDelete = () => {
    commit({
      variables: { id: taskId },
      updater: (store) => {
        // Get the root query
        const root = store.getRoot();
        // Get current tasks
        const tasks = root.getLinkedRecords('allTasks');
        if (tasks) {
          // Filter out the deleted task
          const updatedTasks = tasks.filter(task => task?.getDataID() !== taskId);
          // Update the store with filtered tasks
          root.setLinkedRecords(updatedTasks, 'allTasks');
        }
      },
      onCompleted: (response) => {
        console.log('Task deleted:', response);
        // Call onSuccess which will trigger refresh
        onSuccess?.();
      },
      onError: (error) => {
        console.error('Failed to delete task:', error);
      }
    });
  };

  return (
    <DialogTrigger>
      {children || (
        <Button variant="negative" isQuiet>
          <Delete />
        </Button>
      )}
      <AlertDialog
        variant="destructive"
        title="Delete Task"
        primaryActionLabel={isInFlight ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        onPrimaryAction={handleDelete}
        isPrimaryActionDisabled={isInFlight}
      >
        <Text>
          Are you sure you want to delete "{taskTitle}"? This action cannot be undone.
        </Text>
      </AlertDialog>
    </DialogTrigger>
  );
};