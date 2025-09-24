import React, { useState } from 'react';
import {
  Form,
  TextField,
  TextArea,
  Button,
  ButtonGroup,
  View,
  Flex,
  Heading
} from '@adobe/react-spectrum';
import { useMutation, graphql } from 'react-relay';

const UpdateTaskMutation = graphql`
  mutation EditTaskFormMutation($id: UUID!, $title: String!, $description: String!) {
    updateTask(id: $id, title: $title, description: $description) {
      id
      title
      description
      status
      modifiedAt
    }
  }
`;

interface EditTaskFormProps {
  task: {
    id: string;
    title: string;
    description: string;
  };
  onClose?: () => void;
  onSuccess?: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose, onSuccess }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const [commit, isInFlight] = useMutation(UpdateTaskMutation);

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
        id: task.id,
        title: title.trim(),
        description: description.trim()
      },
      onCompleted: (response) => {
        console.log('Task updated:', response);
        onSuccess?.();
      },
      onError: (error) => {
        console.error('Failed to update task:', error);
        setErrors({ title: 'Failed to update task. Please try again.' });
      }
    });
  };

  const hasChanges = () => {
    return title !== task.title || description !== (task.description || '');
  };

  return (
    <View
      backgroundColor="gray-75"
      padding="size-400"
      borderRadius="medium"
      borderWidth="thin"
      borderColor="gray-200"
    >
      <Form onSubmit={handleSubmit}>
        <Flex direction="column" gap="size-200">
          <Heading level={3} UNSAFE_style={{ margin: 0 }}>
            Edit Task
          </Heading>

          <TextField
            label="Title"
            value={title}
            onChange={setTitle}
            isRequired
            maxLength={100}
            validationState={errors.title ? 'invalid' : undefined}
            errorMessage={errors.title}
            description={`${title.length}/100 characters`}
            isDisabled={isInFlight}
          />

          <TextArea
            label="Description"
            value={description}
            onChange={setDescription}
            maxLength={500}
            height="size-1600"
            validationState={errors.description ? 'invalid' : undefined}
            errorMessage={errors.description}
            description={`${description.length}/500 characters (optional)`}
            isDisabled={isInFlight}
          />

          <ButtonGroup>
            <Button
              variant="cta"
              type="submit"
              isDisabled={isInFlight || !title.trim() || !hasChanges()}
            >
              {isInFlight ? 'Updating...' : 'Update Task'}
            </Button>
            {onClose && (
              <Button variant="secondary" onPress={onClose} isDisabled={isInFlight}>
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </Flex>
      </Form>
    </View>
  );
};