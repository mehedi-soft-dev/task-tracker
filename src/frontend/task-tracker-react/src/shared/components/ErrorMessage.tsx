import React from 'react';
import { View, Heading, Text, Button, Flex } from '@adobe/react-spectrum';
import Alert from '@spectrum-icons/workflow/Alert';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  onRetry
}) => {
  return (
    <View
      UNSAFE_style={{ backgroundColor: '#FEF2F2' }}
      borderRadius="regular"
      padding="size-400"
      borderWidth="thin"
      borderColor="red-500"
    >
      <Flex direction="column" gap="size-200" alignItems="center">
        <Flex gap="size-200" alignItems="center">
          <Alert color="negative" size="L" />
          <Heading level={3} UNSAFE_style={{ color: 'var(--spectrum-global-color-red-700)', margin: 0 }}>
            {title}
          </Heading>
        </Flex>
        <Text UNSAFE_style={{ textAlign: 'center', color: 'var(--spectrum-global-color-gray-800)' }}>
          {message}
        </Text>
        {onRetry && (
          <Button variant="secondary" onPress={onRetry}>
            Try Again
          </Button>
        )}
      </Flex>
    </View>
  );
};