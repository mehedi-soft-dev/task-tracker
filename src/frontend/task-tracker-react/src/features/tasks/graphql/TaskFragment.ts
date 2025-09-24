import { graphql } from 'react-relay';

export const TaskFragment = graphql`
  fragment TaskFragment on TaskItem {
    id
    title
    description
    status
    createdAt
    modifiedAt
  }
`;