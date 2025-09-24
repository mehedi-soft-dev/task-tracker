import { useMutation, graphql } from 'react-relay';
import { useCallback } from 'react';

// GraphQL Mutations
const CreateTaskMutation = graphql`
  mutation useTaskMutationsCreateMutation($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      status
      createdAt
      modifiedAt
    }
  }
`;

const UpdateTaskStatusMutation = graphql`
  mutation useTaskMutationsStatusMutation($id: UUID!, $status: TaskItemStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
      modifiedAt
    }
  }
`;

const UpdateTaskMutation = graphql`
  mutation useTaskMutationsUpdateMutation($id: UUID!, $title: String!, $description: String!) {
    updateTask(id: $id, title: $title, description: $description) {
      id
      title
      description
      modifiedAt
    }
  }
`;

const DeleteTaskMutation = graphql`
  mutation useTaskMutationsDeleteMutation($id: UUID!) {
    deleteTask(id: $id)
  }
`;

export function useTaskMutations() {
  const [commitCreate] = useMutation(CreateTaskMutation);
  const [commitUpdateStatus] = useMutation(UpdateTaskStatusMutation);
  const [commitUpdate] = useMutation(UpdateTaskMutation);
  const [commitDelete] = useMutation(DeleteTaskMutation);

  const createTask = useCallback(
    (title: string, description: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
      commitCreate({
        variables: { title, description },
        updater: (store) => {
          const newTask = store.getRootField('createTask');
          if (!newTask) return;

          const root = store.getRoot();
          const tasks = root.getLinkedRecords('allTasks') || [];
          const updatedTasks = [newTask, ...tasks];
          root.setLinkedRecords(updatedTasks, 'allTasks');
        },
        onCompleted: () => onSuccess?.(),
        onError: (error) => onError?.(error as Error),
      });
    },
    [commitCreate]
  );

  const updateTaskStatus = useCallback(
    (id: string, status: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
      commitUpdateStatus({
        variables: { id, status },
        optimisticResponse: {
          updateTaskStatus: {
            id,
            status,
            modifiedAt: new Date().toISOString(),
          },
        },
        onCompleted: () => onSuccess?.(),
        onError: (error) => onError?.(error as Error),
      });
    },
    [commitUpdateStatus]
  );

  const updateTask = useCallback(
    (id: string, title: string, description: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
      commitUpdate({
        variables: { id, title, description },
        onCompleted: () => onSuccess?.(),
        onError: (error) => onError?.(error as Error),
      });
    },
    [commitUpdate]
  );

  const deleteTask = useCallback(
    (id: string, onSuccess?: () => void, onError?: (error: Error) => void) => {
      commitDelete({
        variables: { id },
        updater: (store) => {
          const root = store.getRoot();
          const tasks = root.getLinkedRecords('allTasks');
          if (tasks) {
            const updatedTasks = tasks.filter(task => task?.getDataID() !== id);
            root.setLinkedRecords(updatedTasks, 'allTasks');
          }
        },
        onCompleted: () => onSuccess?.(),
        onError: (error) => onError?.(error as Error),
      });
    },
    [commitDelete]
  );

  return {
    createTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
  };
}