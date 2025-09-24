import React from 'react';
import { View, Heading, Flex } from '@adobe/react-spectrum';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <View backgroundColor="gray-100" padding="size-400" borderBottomWidth="thin" borderBottomColor="gray-300">
      <View maxWidth="1200px" marginX="auto">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading level={1} UNSAFE_style={{ margin: 0 }}>
            {title}
          </Heading>
          {children && <Flex gap="size-200">{children}</Flex>}
        </Flex>
      </View>
    </View>
  );
};