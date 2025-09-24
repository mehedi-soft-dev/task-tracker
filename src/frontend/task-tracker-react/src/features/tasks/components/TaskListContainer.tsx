import React from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay';
import { TaskList } from './TaskList';
import { LoadingSpinner } from '../../../shared/components';
import { View } from '@adobe/react-spectrum';

const TaskListQuery = graphql`
  query TaskListContainerQuery {
    allTasks {
      id
      title
      description
      status
      createdAt
      modifiedAt
    }
  }
`;

interface TaskListContainerProps {
  onRefresh?: () => void;
  onCreateClick?: () => void;
}

export const TaskListContainer: React.FC<TaskListContainerProps> = ({ onRefresh, onCreateClick }) => {
  const data = useLazyLoadQuery<any>(TaskListQuery, {});

  const handleTaskChange = () => {
    onRefresh?.();
  };

  if (!data) {
    return (
      <View padding="size-400">
        <LoadingSpinner label="Loading tasks..." />
      </View>
    );
  }

  if (!data.allTasks || data.allTasks.length === 0) {
    return <TaskList tasks={[]} onTaskUpdated={handleTaskChange} onTaskDeleted={handleTaskChange} onCreateClick={onCreateClick} />;
  }

  return <TaskList tasks={data.allTasks} onTaskUpdated={handleTaskChange} onTaskDeleted={handleTaskChange} onCreateClick={onCreateClick} />;
};