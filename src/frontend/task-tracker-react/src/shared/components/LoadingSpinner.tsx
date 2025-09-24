import React from 'react';
import { ProgressCircle, View, Text, Flex } from '@adobe/react-spectrum';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'S' | 'M' | 'L';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Loading...',
  size = 'M'
}) => {
  return (
    <View padding="size-500">
      <Flex direction="column" alignItems="center" gap="size-200">
        <ProgressCircle aria-label={label} isIndeterminate size={size} />
        {label && (
          <Text UNSAFE_style={{ color: 'var(--spectrum-global-color-gray-700)' }}>
            {label}
          </Text>
        )}
      </Flex>
    </View>
  );
};