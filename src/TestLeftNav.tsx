import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';

const TestLeftNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen h-screen bg-background-primary text-text-primary flex overflow-hidden">
        {/* Left Navigation */}
        <div className={`fixed md:relative left-0 top-0 h-screen z-30 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-0 md:w-16'
        }`}>
          <div className={`h-full min-h-screen bg-background-secondary border-r border-border-primary flex flex-col ${
            isOpen ? 'w-64' : 'w-0 md:w-16'
          } transition-all duration-300 overflow-hidden shadow-lg`}>
            {/* Drawer Header */}
            <div className="p-4 border-b border-border-primary flex items-center justify-between">
              <div className={`flex items-center ${isOpen ? 'justify-between w-full' : 'justify-center'}`}>
                {isOpen && (
                  <div className="flex items-center">
                    <span className="font-bold text-lg text-primary-600 dark:text-primary-400">OpenHands</span>
                  </div>
                )}
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="p-2 rounded-md hover:bg-background-tertiary text-text-secondary"
                  aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                >
                  {isOpen ? "Close" : "Open"}
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {isOpen ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Navigation</h3>
                    <ul className="space-y-2">
                      <li>
                        <button className="w-full text-left px-3 py-2 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                          Home
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-3 py-2 rounded-md hover:bg-background-tertiary text-text-secondary">
                          Messages
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-3 py-2 rounded-md hover:bg-background-tertiary text-text-secondary">
                          Settings
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <button className="p-2 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                      H
                    </button>
                    <button className="p-2 rounded-md hover:bg-background-tertiary text-text-secondary">
                      M
                    </button>
                    <button className="p-2 rounded-md hover:bg-background-tertiary text-text-secondary">
                      S
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-border-primary p-4">
              {isOpen ? (
                <div className="text-text-secondary">
                  <p>User: Test User</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <span className="text-text-secondary">TU</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top navigation bar */}
          <div className="bg-background-secondary border-b border-border-primary p-4">
            <h1 className="text-xl font-bold">Test Application</h1>
          </div>
          
          {/* Main content area */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Main Content</h2>
              <p className="mb-4">
                This is a test component to verify that the left navigation is working correctly.
                The navigation should stretch the full height of the viewport.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-background-secondary rounded-xl border border-border-primary">
                  <h3 className="text-lg font-medium mb-2">Card 1</h3>
                  <p className="text-text-secondary">
                    This is a test card to demonstrate the layout.
                  </p>
                </div>
                <div className="p-6 bg-background-secondary rounded-xl border border-border-primary">
                  <h3 className="text-lg font-medium mb-2">Card 2</h3>
                  <p className="text-text-secondary">
                    This is another test card to demonstrate the layout.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TestLeftNav;