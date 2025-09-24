import React from 'react';
import { Switch } from '@adobe/react-spectrum';
import { useMutation, graphql } from 'react-relay';

const UpdateStatusMutation = graphql`
  mutation TaskStatusToggleMutation($id: UUID!, $status: TaskItemStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
      modifiedAt
    }
  }
`;

interface TaskStatusToggleProps {
  taskId: string;
  currentStatus: string;
  onStatusChanged?: () => void;
}

export const TaskStatusToggle: React.FC<TaskStatusToggleProps> = ({ taskId, currentStatus, onStatusChanged }) => {
  const [commit, isInFlight] = useMutation(UpdateStatusMutation);

  const isCompleted = currentStatus.toUpperCase() === 'COMPLETED' || currentStatus.toUpperCase() === 'DONE';

  const handleToggle = (isSelected: boolean) => {
    const newStatus = isSelected ? 'COMPLETED' : 'PENDING';

    commit({
      variables: {
        id: taskId,
        status: newStatus
      },
      optimisticResponse: {
        updateTaskStatus: {
          id: taskId,
          status: newStatus,
          modifiedAt: new Date().toISOString()
        }
      },
      onCompleted: (response) => {
        console.log('Task status updated:', response);
        onStatusChanged?.();
      },
      onError: (error) => {
        console.error('Failed to update task status:', error);
      }
    });
  };

  return (
    <Switch
      isSelected={isCompleted}
      onChange={handleToggle}
      isDisabled={isInFlight}
      UNSAFE_style={{ cursor: 'pointer' }}
    />
  );
};