import React from 'react';
import { Provider, defaultTheme, View, Flex } from '@adobe/react-spectrum';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <View backgroundColor="gray-50" minHeight="100vh">
        <Flex direction="column" height="100vh">
          {children}
        </Flex>
      </View>
    </Provider>
  );
};