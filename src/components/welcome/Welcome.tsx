import React, { useState } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import App from '../../App';

const Welcome: React.FC = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-primary text-text-primary p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to OpenHands UI</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          This is a modified version of the OpenHands UI with enhanced features and improved design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {[
            {
              title: 'Enhanced Chat Interface',
              description: 'Improved chat interface with AI mode selector and better message cards.'
            },
            {
              title: 'Preview Panel',
              description: 'Enhanced preview panel for viewing code, images, and other content.'
            },
            {
              title: 'Theme Support',
              description: 'Support for light, dark, and sepia themes with improved contrast.'
            },
            {
              title: 'Responsive Design',
              description: 'Fully responsive design that works on all screen sizes.'
            },
            {
              title: 'Keyboard Shortcuts',
              description: 'Comprehensive keyboard shortcuts for power users.'
            },
            {
              title: 'GitHub Integration',
              description: 'Improved GitHub integration for better code management.'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-background-card p-6 rounded-lg shadow-sm border border-border-primary hover:border-primary-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 text-primary-600 dark:text-primary-400">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <button 
            onClick={() => setShowApp(true)}
            className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Welcome;