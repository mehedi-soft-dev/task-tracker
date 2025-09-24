import React from 'react';
import { View, Flex } from '@adobe/react-spectrum';
import { TaskItem } from './TaskItem';
import { EmptyState } from '../../../shared/components';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated?: () => void;
  onTaskDeleted?: () => void;
  onCreateClick?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted, onCreateClick }) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Get started by creating your first task"
        actionLabel="Create Task"
        onAction={onCreateClick || (() => console.log('Create task clicked'))}
      />
    );
  }

  return (
    <View padding="size-200">
      <Flex direction="column" gap="size-200">
        {tasks.filter(task => task && task.id).map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </Flex>
    </View>
  );
};