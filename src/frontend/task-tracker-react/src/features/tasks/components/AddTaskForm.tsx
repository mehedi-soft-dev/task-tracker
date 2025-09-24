import React, { useState } from 'react';
import {
  Form,
  TextField,
  TextArea,
  Button,
  ButtonGroup,
  View,
  Flex,
  Heading,
} from '@adobe/react-spectrum';
import { useMutation, graphql } from 'react-relay';

const CreateTaskMutation = graphql`
  mutation AddTaskFormMutation($title: String!, $description: String!) {
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

interface AddTaskFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const [commit, isInFlight] = useMutation(CreateTaskMutation);

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    commit({
      variables: {
        title: title.trim(),
        description: description.trim(),
      },
      updater: (store, data) => {
        // Get the new task from the payload
        const newTask = store.getRootField('createTask');
        if (!newTask) return;

        // Get the root query
        const root = store.getRoot();
        // Get current tasks
        const tasks = root.getLinkedRecords('allTasks') || [];
        // Add the new task at the beginning (since we want newest first)
        const updatedTasks = [newTask, ...tasks];
        // Update the store with the new list
        root.setLinkedRecords(updatedTasks, 'allTasks');
      },
      onCompleted: (response) => {
        console.log('Task created:', response);
        setTitle('');
        setDescription('');
        onSuccess?.();
      },
      onError: (error) => {
        console.error('Failed to create task:', error);
        setErrors({ title: 'Failed to create task. Please try again.' });
      },
    });
  };

  return (
    <View UNSAFE_className="modern-form">
      <View UNSAFE_className="form-header">
        <h2 className="form-title">Create New Task</h2>
      </View>

      <Form onSubmit={handleSubmit}>
        <Flex direction="column" gap="size-300">
          <View UNSAFE_className="form-field">
            <TextField
              label="Task Title"
              value={title}
              onChange={setTitle}
              isRequired
              maxLength={100}
              validationState={errors.title ? 'invalid' : undefined}
              errorMessage={errors.title}
              description={`${title.length}/100 characters`}
              isDisabled={isInFlight}
              UNSAFE_className="form-input"
              placeholder="Enter task title..."
            />
          </View>

          <View UNSAFE_className="form-field">
            <TextArea
              label="Description"
              value={description}
              onChange={setDescription}
              maxLength={500}
              height="size-2000"
              validationState={errors.description ? 'invalid' : undefined}
              errorMessage={errors.description}
              description={`${description.length}/500 characters (optional)`}
              isDisabled={isInFlight}
              UNSAFE_className="form-textarea"
              placeholder="Add a description..."
            />
          </View>

          <ButtonGroup>
            <Button
              variant="cta"
              type="submit"
              isDisabled={isInFlight || !title.trim()}
              UNSAFE_className="modern-button button-primary"
            >
              {isInFlight ? 'Creating...' : 'Create Task'}
            </Button>
            {onClose && (
              <Button
                variant="secondary"
                onPress={onClose}
                isDisabled={isInFlight}
                UNSAFE_style={{ marginLeft: '1rem' }}
              >
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </Flex>
      </Form>
    </View>
  );
};
