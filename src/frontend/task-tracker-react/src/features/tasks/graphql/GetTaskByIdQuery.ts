import { graphql } from 'react-relay';

export const GetTaskByIdQuery = graphql`
  query GetTaskByIdQuery($id: UUID!) {
    taskById(id: $id) {
      ...TaskFragment
    }
  }
`;