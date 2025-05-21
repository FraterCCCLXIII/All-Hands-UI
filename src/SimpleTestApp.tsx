import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import FixedChatInput from './components/chat/FixedChatInput';
import ErrorBoundary from './components/error/ErrorBoundary';

const SimpleTestApp: React.FC = () => {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-primary text-text-primary p-4">
        <h1 className="text-2xl font-bold mb-4">Simple Test App</h1>
        <p className="mb-4">Count: {count}</p>
        <button 
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 mb-4"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="bg-background-secondary p-4 rounded mb-4 min-h-[100px]">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-background-tertiary rounded">
                {msg}
              </div>
            ))}
          </div>
          
          <ErrorBoundary>
            <FixedChatInput
              onSendMessage={(content) => {
                setMessages([...messages, content]);
              }}
              isAgentConnected={true}
              isProcessRunning={false}
              onStartProcess={() => console.log('Start process')}
              onStopProcess={() => console.log('Stop process')}
              onConnectGitHub={() => console.log('Connect GitHub')}
              isGitHubConnected={false}
            />
          </ErrorBoundary>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SimpleTestApp;