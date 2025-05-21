import React, { useState } from 'react';
import SimpleApp from './SimpleApp';

const SimpleWelcome: React.FC = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <SimpleApp />;
  }

  return (
    <div className="min-h-screen bg-background-primary text-text-primary p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to OpenHands UI</h1>
      <p className="mb-4">This is a simplified welcome screen that can navigate to the SimpleApp component.</p>
      <button 
        onClick={() => setShowApp(true)}
        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      >
        Get Started
      </button>
    </div>
  );
};

export default SimpleWelcome;