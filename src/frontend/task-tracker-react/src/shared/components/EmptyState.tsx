import React from 'react';
import { View, Heading, Text, Button, Flex } from '@adobe/react-spectrum';
import FolderOpen from '@spectrum-icons/workflow/FolderOpen';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon
}) => {
  return (
    <View padding="size-1000">
      <Flex direction="column" alignItems="center" gap="size-300">
        {icon || <FolderOpen size="XXL" />}
        <Flex direction="column" gap="size-100" alignItems="center">
          <Heading level={3} UNSAFE_style={{ margin: 0, color: 'var(--spectrum-global-color-gray-800)' }}>
            {title}
          </Heading>
          {description && (
            <Text UNSAFE_style={{ textAlign: 'center', color: 'var(--spectrum-global-color-gray-600)' }}>
              {description}
            </Text>
          )}
        </Flex>
        {actionLabel && onAction && (
          <Button variant="primary" onPress={onAction}>
            {actionLabel}
          </Button>
        )}
      </Flex>
    </View>
  );
};