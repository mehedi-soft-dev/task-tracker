import { graphql } from 'react-relay';

export const GetAllTasksQuery = graphql`
  query GetAllTasksQuery(
    $where: TaskItemFilterInput
    $order: [TaskItemSortInput!]
  ) {
    allTasks(where: $where, order: $order) {
      ...TaskFragment
    }
  }
`;