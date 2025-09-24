import { graphql } from 'react-relay';

export const UpdateTaskStatusMutation = graphql`
  mutation UpdateTaskStatusMutation($id: UUID!, $status: TaskItemStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      ...TaskFragment
    }
  }
`;