import { useState, useEffect } from 'react';
import './styles/App.css';
import { ThemeProvider } from './context/ThemeContext';
import ChatInterface from './components/chat/ChatInterface';
import CodeEditor from './components/code/CodeEditor';
import LeftDrawer from './components/navigation/LeftDrawer';
import MessageFeed from './components/feed/MessageFeed';
import SettingsPanel from './components/settings/SettingsPanel';
import CommandPalette from './components/command/CommandPalette';
import KeyboardShortcuts from './components/help/KeyboardShortcuts';
import UserProfile from './components/profile/UserProfile';
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import FileExplorer from './components/files/FileExplorer';
import NotificationCenter from './components/notifications/NotificationCenter';
import GlobalSearch from './components/search/GlobalSearch';
import { ConversationItem, Message } from './types/conversation';
import { v4 as uuidv4 } from 'uuid';
import { FiSearch, FiBell, FiCommand, FiUser, FiHelpCircle } from 'react-icons/fi';

// Mock data for conversations
const mockConversations: ConversationItem[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    lastMessage: 'Here are some resources to help you learn React...',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    title: 'Debugging TypeScript Errors',
    lastMessage: 'Let me help you fix those type errors...',
    timestamp: '11:45 AM',
  },
  {
    id: '3',
    title: 'Optimizing Performance',
    lastMessage: 'Here are some techniques to improve your app performance...',
    timestamp: 'Yesterday',
    unread: true,
  },
];

// Mock data for messages with different types
const mockMessages: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'Welcome to OpenHands AI. How can I help you today?',
    timestamp: '1:30 PM',
    type: 'info',
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you help me with React hooks?',
    timestamp: '1:31 PM',
    type: 'text',
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Sure! React hooks are functions that let you use state and other React features without writing a class. Here\'s a simple example of the useState hook:',
    timestamp: '1:32 PM',
    type: 'text',
  },
  {
    id: '4',
    role: 'assistant',
    content: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    timestamp: '1:32 PM',
    type: 'code',
  },
  {
    id: '5',
    role: 'system',
    content: 'Warning: Your session will expire in 5 minutes due to inactivity.',
    timestamp: '1:40 PM',
    type: 'warning',
  },
  {
    id: '6',
    role: 'assistant',
    content: 'https://placekitten.com/800/400',
    timestamp: '1:45 PM',
    type: 'image',
  },
  {
    id: '7',
    role: 'error',
    content: 'Failed to execute code. Error: ReferenceError: someVariable is not defined',
    timestamp: '1:50 PM',
    type: 'error',
  },
  {
    id: '8',
    role: 'assistant',
    content: 'I\'ve created a file with the example code for you.',
    timestamp: '1:55 PM',
    type: 'file',
    metadata: {
      filename: 'example.js',
      size: '1.2 KB',
    },
  },
  {
    id: '9',
    role: 'notification',
    content: 'Your code has been successfully executed with no errors.',
    timestamp: '2:00 PM',
    type: 'success',
  },
];

function App() {
  // UI state
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [keyboardShortcutsOpen, setKeyboardShortcutsOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [welcomeScreenOpen, setWelcomeScreenOpen] = useState(true);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(false);
  
  // Content state
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat');
  const [activeConversationId, setActiveConversationId] = useState<string | null>('1');
  const [conversations, setConversations] = useState<ConversationItem[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [code, setCode] = useState(`// Example code
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('OpenHands'));
`);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette - Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      
      // Keyboard shortcuts - Cmd+/ or Ctrl+/
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setKeyboardShortcutsOpen(true);
      }
      
      // Settings - Cmd+, or Ctrl+,
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(true);
      }
      
      // Switch to Chat tab - Cmd+1 or Ctrl+1
      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        e.preventDefault();
        setActiveTab('chat');
      }
      
      // Switch to Code Editor tab - Cmd+2 or Ctrl+2
      if ((e.metaKey || e.ctrlKey) && e.key === '2') {
        e.preventDefault();
        setActiveTab('code');
      }
      
      // New conversation - Cmd+N or Ctrl+N
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        createNewConversation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // UI actions
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const createNewConversation = () => {
    const newId = uuidv4();
    const newConversation: ConversationItem = {
      id: newId,
      title: `New Conversation ${conversations.length + 1}`,
      lastMessage: 'How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
      unread: false,
    };
    
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newId);
    
    // Reset messages for new conversation
    setMessages([{
      id: uuidv4(),
      role: 'system',
      content: 'Welcome to a new conversation. How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
    }]);
  };

  const selectConversation = (id: string) => {
    setActiveConversationId(id);
    // In a real app, we would fetch messages for this conversation
    // For now, we'll just use our mock messages
  };

  const openDocumentation = () => {
    // In a real app, this would navigate to documentation
    alert('Documentation would open here');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-primary text-text-primary flex">
        {/* Left Navigation Drawer */}
        <LeftDrawer 
          isOpen={drawerOpen}
          onToggle={toggleDrawer}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onCreateNewConversation={createNewConversation}
          onSelectConversation={selectConversation}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenDocumentation={openDocumentation}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Top navigation bar */}
          <div className="bg-background-secondary border-b border-border-primary p-2 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                    : 'hover:bg-background-tertiary'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'code'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                    : 'hover:bg-background-tertiary'
                }`}
              >
                Code Editor
              </button>
              <button
                onClick={() => setShowFileExplorer(!showFileExplorer)}
                className={`ml-2 px-4 py-2 rounded-md transition-colors ${
                  showFileExplorer
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                    : 'hover:bg-background-tertiary'
                }`}
              >
                Files
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setGlobalSearchOpen(true)}
                className="p-2 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors flex items-center"
                title="Search (Cmd+K)"
              >
                <FiSearch size={18} />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationCenterOpen(true);
                    setUnreadNotifications(0);
                  }}
                  className="p-2 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
                  title="Notifications"
                >
                  <FiBell size={18} />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-status-error text-white text-xs flex items-center justify-center rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>
              
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="p-2 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
                title="Command Palette (Cmd+K)"
              >
                <FiCommand size={18} />
              </button>
              
              <button
                onClick={() => setKeyboardShortcutsOpen(true)}
                className="p-2 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
                title="Keyboard Shortcuts (Cmd+/)"
              >
                <FiHelpCircle size={18} />
              </button>
              
              <button
                onClick={() => setUserProfileOpen(true)}
                className="p-2 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
                title="User Profile"
              >
                <FiUser size={18} />
              </button>
            </div>
          </div>
          
          {/* Main content area */}
          <main className="flex-1 flex overflow-hidden">
            {/* File explorer (optional) */}
            {showFileExplorer && (
              <div className="w-64 border-r border-border-primary">
                <FileExplorer onFileSelect={(file) => console.log('Selected file:', file)} />
              </div>
            )}
            
            {/* Content based on active tab */}
            <div className="flex-1 flex flex-col">
              {/* Tab content */}
              {activeTab === 'chat' ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-border-primary">
                    <h2 className="text-lg font-medium">
                      {activeConversationId 
                        ? conversations.find(c => c.id === activeConversationId)?.title || 'Chat' 
                        : 'Chat with AI Assistant'}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <MessageFeed messages={messages} />
                    <div className="p-4 border-t border-border-primary">
                      <ChatInterface
                        initialMessages={[]}
                        onSendMessage={(content) => {
                          const newUserMessage: Message = {
                            id: uuidv4(),
                            role: 'user',
                            content,
                            timestamp: new Date().toLocaleTimeString(),
                            type: 'text',
                          };
                          
                          setMessages([...messages, newUserMessage]);
                          
                          // Simulate assistant response after a delay
                          setTimeout(() => {
                            const newAssistantMessage: Message = {
                              id: uuidv4(),
                              role: 'assistant',
                              content: `I received your message: "${content}". This is a simulated response.`,
                              timestamp: new Date().toLocaleTimeString(),
                              type: 'text',
                            };
                            
                            setMessages(prev => [...prev, newAssistantMessage]);
                          }, 1000);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-border-primary">
                    <h2 className="text-lg font-medium">Code Editor</h2>
                  </div>
                  <div className="p-4 flex-1 overflow-auto">
                    <CodeEditor
                      initialCode={code}
                      language="javascript"
                      onChange={setCode}
                    />
                    <div className="mt-4">
                      <h3 className="text-md font-medium mb-2">Output</h3>
                      <div className="bg-background-tertiary p-4 rounded-lg font-mono text-sm">
                        {code.includes('console.log') ? 'Hello, OpenHands!' : 'No output yet...'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
        
        {/* Modals and panels */}
        <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        
        <CommandPalette 
          isOpen={commandPaletteOpen} 
          onClose={() => setCommandPaletteOpen(false)}
          onCreateNewConversation={createNewConversation}
          onOpenSettings={() => {
            setCommandPaletteOpen(false);
            setSettingsOpen(true);
          }}
          onOpenDocumentation={openDocumentation}
          onSwitchTab={setActiveTab}
        />
        
        <KeyboardShortcuts 
          isOpen={keyboardShortcutsOpen} 
          onClose={() => setKeyboardShortcutsOpen(false)} 
        />
        
        <UserProfile 
          isOpen={userProfileOpen} 
          onClose={() => setUserProfileOpen(false)} 
        />
        
        <WelcomeScreen 
          isOpen={welcomeScreenOpen} 
          onComplete={() => setWelcomeScreenOpen(false)} 
        />
        
        <NotificationCenter 
          isOpen={notificationCenterOpen} 
          onClose={() => setNotificationCenterOpen(false)} 
        />
        
        <GlobalSearch 
          isOpen={globalSearchOpen} 
          onClose={() => setGlobalSearchOpen(false)}
          onSelectResult={(result) => {
            console.log('Selected search result:', result);
            setGlobalSearchOpen(false);
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;