import React from 'react';
import App from './App';
import ErrorBoundary from './components/error/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

const AppWithErrorBoundary: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppWithErrorBoundary;