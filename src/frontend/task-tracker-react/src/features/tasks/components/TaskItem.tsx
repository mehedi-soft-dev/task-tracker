import React, { useState } from 'react';
import { View, Flex, ActionButton, DialogTrigger, Dialog, Content } from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import Delete from '@spectrum-icons/workflow/Delete';
import { TaskStatusToggle } from './TaskStatusToggle';
import { EditTaskForm } from './EditTaskForm';
import { DeleteTaskDialog } from './DeleteTaskDialog';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
}

interface TaskItemProps {
  task: Task;
  onTaskUpdated?: () => void;
  onTaskDeleted?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditSuccess = () => {
    setShowEditForm(false);
    onTaskUpdated?.();
  };

  const handleDeleteSuccess = () => {
    onTaskDeleted?.();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isCompleted = task.status.toUpperCase() === 'COMPLETED';

  return (
    <View UNSAFE_className={`task-card ${isCompleted ? 'task-card-completed' : ''}`}>
      <Flex justifyContent="space-between" alignItems="center">
        <View flex>
          <h3
            className="task-title"
            style={isCompleted ? { textDecoration: 'line-through', opacity: 0.6 } : {}}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="task-description">
              {task.description}
            </p>
          )}
          <span className="task-meta">{formatDate(task.createdAt)}</span>
        </View>
        <Flex gap="size-100" alignItems="center" UNSAFE_className="action-buttons">
          <TaskStatusToggle
            taskId={task.id}
            currentStatus={task.status}
            onStatusChanged={onTaskUpdated}
          />
          <DialogTrigger isOpen={showEditForm} onOpenChange={setShowEditForm}>
            <ActionButton isQuiet UNSAFE_className="icon-button">
              <Edit size="S" UNSAFE_className="icon-edit" />
            </ActionButton>
            <Dialog UNSAFE_className="modern-dialog">
              <Content UNSAFE_className="dialog-content">
                <EditTaskForm
                  task={task}
                  onClose={() => setShowEditForm(false)}
                  onSuccess={handleEditSuccess}
                />
              </Content>
            </Dialog>
          </DialogTrigger>
          <DeleteTaskDialog
            taskId={task.id}
            taskTitle={task.title}
            onSuccess={handleDeleteSuccess}
          >
            <ActionButton isQuiet UNSAFE_className="icon-button">
              <Delete size="S" UNSAFE_className="icon-delete" />
            </ActionButton>
          </DeleteTaskDialog>
        </Flex>
      </Flex>
    </View>
  );
};
