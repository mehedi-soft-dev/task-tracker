import React, { Suspense, useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from './config/environment';
import { ErrorBoundary } from './shared/components';
import { TaskListContainer, AddTaskForm } from './features/tasks/components';
import {
  Provider,
  defaultTheme,
  View,
  Button,
  Flex,
  DialogTrigger,
  Dialog,
  Content,
  ActionButton,
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import './styles/global.css';
import './styles/modern.css';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setShowAddForm(false);
    setRefreshKey((key) => key + 1); // Force refresh of task list
  };

  return (
    <Provider theme={defaultTheme}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ErrorBoundary>
          <View UNSAFE_className="app-container" minHeight="100vh">
            {/* Modern Header */}
            <View UNSAFE_className="modern-header">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                maxWidth="1200px"
                marginX="auto"
              >
                <View>
                  <h1 className="header-title">Task Tracker</h1>
                  <p className="header-subtitle">Manage your tasks efficiently</p>
                </View>
                <DialogTrigger isOpen={showAddForm} onOpenChange={setShowAddForm}>
                  <Button variant="cta" UNSAFE_className="modern-button button-primary">
                    <Add size="S" />
                    <span style={{ marginLeft: '8px' }}>New Task</span>
                  </Button>
                  <Dialog UNSAFE_className="modern-dialog">
                    <Content UNSAFE_className="dialog-content">
                      <AddTaskForm
                        onClose={() => setShowAddForm(false)}
                        onSuccess={handleTaskCreated}
                      />
                    </Content>
                  </Dialog>
                </DialogTrigger>
              </Flex>
            </View>

            {/* Main Content */}
            <View padding="size-600">
              <View maxWidth="1200px" marginX="auto">
                <Suspense
                  key={refreshKey}
                  fallback={
                    <View UNSAFE_className="loading-container">
                      <div className="loading-spinner"></div>
                      <p>Loading your tasks...</p>
                    </View>
                  }
                >
                  <TaskListContainer
                    onRefresh={() => setRefreshKey((key) => key + 1)}
                    onCreateClick={() => setShowAddForm(true)}
                  />
                </Suspense>
              </View>
            </View>

          </View>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </Provider>
  );
}

export default App;
