import { useState } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiPlus, 
  FiMessageSquare, 
  FiBook, 
  FiSettings,
  FiChevronRight
} from 'react-icons/fi';
import { ConversationItem } from '../../types/conversation';

interface LeftDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: ConversationItem[];
  activeConversationId: string | null;
  onCreateNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onOpenSettings: () => void;
  onOpenDocumentation: () => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  isOpen,
  onToggle,
  conversations,
  activeConversationId,
  onCreateNewConversation,
  onSelectConversation,
  onOpenSettings,
  onOpenDocumentation
}) => {
  return (
    <div className={`fixed md:relative left-0 top-0 h-screen z-30 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-0 md:w-16'
    }`}>
      <div className={`h-full min-h-screen bg-background-secondary border-r border-border-primary flex flex-col ${
        isOpen ? 'w-64' : 'w-0 md:w-16'
      } transition-all duration-300 overflow-hidden shadow-lg`}>
        {/* Drawer Header with Logo and Toggle */}
        <div className="p-4 border-b border-border-primary flex items-center justify-between">
          <div className={`flex items-center ${isOpen ? 'justify-between w-full' : 'justify-center'}`}>
            {isOpen && (
              <div className="flex items-center">
                <img 
                  src="/logo.svg" 
                  alt="All-Hands Logo" 
                  className="h-8 w-8 mr-2"
                  onError={(e) => {
                    // Fallback if logo doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTAtMTRjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+';
                  }}
                />
                <span className="font-bold text-lg text-primary-600 dark:text-primary-400">OpenHands</span>
              </div>
            )}
            <button 
              onClick={onToggle} 
              className="p-2 rounded-md hover:bg-background-tertiary text-text-secondary"
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
        
        {/* New Conversation Button */}
        <div className={`p-2 ${isOpen ? '' : 'flex justify-center'}`}>
          <button
            onClick={onCreateNewConversation}
            className={`flex items-center ${
              isOpen 
                ? 'w-full justify-start px-4 py-2 gap-2' 
                : 'justify-center p-2'
            } bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors`}
          >
            <FiPlus size={isOpen ? 16 : 20} />
            {isOpen && <span>New Conversation</span>}
          </button>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className={`py-2 ${isOpen ? 'px-2' : 'px-0'}`}>
            {isOpen && <h3 className="text-xs uppercase text-text-tertiary font-semibold px-2 mb-2">Conversations</h3>}
            <ul className="space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`flex items-center ${
                      isOpen 
                        ? 'w-full justify-between px-3 py-2' 
                        : 'justify-center p-2 mx-auto'
                    } rounded-md transition-colors ${
                      activeConversationId === conversation.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                        : 'hover:bg-background-tertiary text-text-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FiMessageSquare size={isOpen ? 16 : 20} />
                      {isOpen && (
                        <span className="truncate">{conversation.title}</span>
                      )}
                    </div>
                    {isOpen && activeConversationId === conversation.id && (
                      <FiChevronRight size={16} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="border-t border-border-primary py-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={onOpenDocumentation}
                className={`flex items-center ${
                  isOpen 
                    ? 'w-full justify-start px-4 py-2 gap-2' 
                    : 'justify-center p-2 mx-auto'
                } rounded-md hover:bg-background-tertiary text-text-secondary transition-colors`}
              >
                <FiBook size={isOpen ? 16 : 20} />
                {isOpen && <span>Documentation</span>}
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSettings}
                className={`flex items-center ${
                  isOpen 
                    ? 'w-full justify-start px-4 py-2 gap-2' 
                    : 'justify-center p-2 mx-auto'
                } rounded-md hover:bg-background-tertiary text-text-secondary transition-colors`}
              >
                <FiSettings size={isOpen ? 16 : 20} />
                {isOpen && <span>Settings</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftDrawer;