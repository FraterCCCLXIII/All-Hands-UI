import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/error/ErrorBoundary';
import ChatInput from './components/chat/ChatInput';

// Create a minimal version of each component to identify which one is causing issues
const MinimalMessageFeed: React.FC = () => {
  return <div className="flex-1 p-4">Minimal Message Feed</div>;
};

const MinimalLeftDrawer: React.FC = () => {
  return <div className="w-64 bg-gray-100 p-4">Minimal Left Drawer</div>;
};

const DebugApp: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-background-primary text-text-primary flex">
          {/* Left Navigation Drawer */}
          <ErrorBoundary>
            <MinimalLeftDrawer />
          </ErrorBoundary>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col h-screen">
            {/* Top navigation bar */}
            <ErrorBoundary>
              <div className="bg-background-secondary border-b border-border-primary p-2 flex items-center justify-between">
                <div>Navigation Tabs</div>
                <div>Action Buttons</div>
              </div>
            </ErrorBoundary>
            
            {/* Main content area */}
            <main className="flex-1 flex overflow-hidden">
              {/* Content based on active tab */}
              <div className="flex-1 flex flex-col">
                <ErrorBoundary>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-border-primary">
                      <h2 className="text-lg font-medium">Chat with AI Assistant</h2>
                    </div>
                    <div className="flex-1 overflow-hidden flex flex-col">
                      <ErrorBoundary>
                        <MinimalMessageFeed />
                      </ErrorBoundary>
                      <div className="p-4 border-t border-border-primary">
                        <ErrorBoundary>
                          <ChatInput
                            onSendMessage={(content) => {
                              console.log('Message sent:', content);
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
                  </div>
                </ErrorBoundary>
              </div>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default DebugApp;