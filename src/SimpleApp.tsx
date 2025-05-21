import React from 'react';
import { ThemeProvider } from './context/ThemeContext';

const SimpleApp: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-primary text-text-primary p-8">
        <h1 className="text-3xl font-bold mb-4">Simple App</h1>
        <p className="mb-4">This is a simplified version of the App component to test if it renders correctly.</p>
        <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
          Test Button
        </button>
      </div>
    </ThemeProvider>
  );
};

export default SimpleApp;