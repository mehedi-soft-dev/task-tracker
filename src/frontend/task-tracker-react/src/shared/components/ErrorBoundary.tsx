import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
          <ErrorMessage
            title="Something went wrong"
            message={this.state.error?.message || 'An unexpected error occurred'}
            onRetry={this.handleReset}
          />
        </div>
      );
    }

    return this.props.children;
  }
}