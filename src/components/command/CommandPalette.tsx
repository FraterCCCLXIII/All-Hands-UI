import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiCommand, FiSettings, FiFileText, FiCode, FiMessageSquare, FiPlus, FiHelpCircle } from 'react-icons/fi';

interface CommandItem {
  id: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'navigation' | 'actions' | 'tools' | 'help';
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNewConversation: () => void;
  onOpenSettings: () => void;
  onOpenDocumentation: () => void;
  onSwitchTab: (tab: 'chat' | 'code') => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onCreateNewConversation,
  onOpenSettings,
  onOpenDocumentation,
  onSwitchTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<HTMLDivElement>(null);

  // Define command items
  const commandItems: CommandItem[] = [
    {
      id: 'new-conversation',
      name: 'New Conversation',
      shortcut: '⌘N',
      icon: <FiPlus />,
      action: () => {
        onCreateNewConversation();
        onClose();
      },
      category: 'actions',
    },
    {
      id: 'switch-to-chat',
      name: 'Switch to Chat',
      shortcut: '⌘1',
      icon: <FiMessageSquare />,
      action: () => {
        onSwitchTab('chat');
        onClose();
      },
      category: 'navigation',
    },
    {
      id: 'switch-to-code',
      name: 'Switch to Code Editor',
      shortcut: '⌘2',
      icon: <FiCode />,
      action: () => {
        onSwitchTab('code');
        onClose();
      },
      category: 'navigation',
    },
    {
      id: 'open-settings',
      name: 'Open Settings',
      shortcut: '⌘,',
      icon: <FiSettings />,
      action: () => {
        onOpenSettings();
        onClose();
      },
      category: 'tools',
    },
    {
      id: 'open-docs',
      name: 'Open Documentation',
      shortcut: '⌘D',
      icon: <FiFileText />,
      action: () => {
        onOpenDocumentation();
        onClose();
      },
      category: 'help',
    },
    {
      id: 'keyboard-shortcuts',
      name: 'Keyboard Shortcuts',
      shortcut: '⌘/',
      icon: <FiHelpCircle />,
      action: () => {
        alert('Keyboard shortcuts would be shown here');
        onClose();
      },
      category: 'help',
    },
  ];

  // Filter commands based on search term
  const filteredCommands = commandItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prevIndex) =>
            prevIndex < filteredCommands.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (commandListRef.current) {
      const selectedElement = commandListRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement;
      
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background-overlay backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-background-card rounded-xl shadow-xl border border-border-primary overflow-hidden">
        {/* Search input */}
        <div className="flex items-center px-4 py-3 border-b border-border-primary">
          <FiSearch className="text-text-tertiary mr-3" size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-tertiary"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="flex items-center justify-center h-6 w-6 rounded bg-background-tertiary text-text-tertiary text-xs">
            <FiCommand size={14} />
          </div>
        </div>

        {/* Command list */}
        <div 
          ref={commandListRef}
          className="max-h-[60vh] overflow-y-auto"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-6 px-4 text-center text-text-tertiary">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {/* Group commands by category */}
              {['navigation', 'actions', 'tools', 'help'].map((category) => {
                const categoryCommands = filteredCommands.filter(
                  (cmd) => cmd.category === category
                );
                
                if (categoryCommands.length === 0) return null;
                
                return (
                  <div key={category} className="mb-2">
                    <div className="px-4 py-1 text-xs font-medium text-text-tertiary uppercase">
                      {category}
                    </div>
                    {categoryCommands.map((command, index) => {
                      const commandIndex = filteredCommands.findIndex(
                        (cmd) => cmd.id === command.id
                      );
                      
                      return (
                        <div
                          key={command.id}
                          data-index={commandIndex}
                          className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                            selectedIndex === commandIndex
                              ? 'bg-primary-500 text-text-inverted'
                              : 'hover:bg-background-tertiary'
                          }`}
                          onClick={() => command.action()}
                          onMouseEnter={() => setSelectedIndex(commandIndex)}
                        >
                          <div className="flex items-center">
                            <span className={`mr-3 ${selectedIndex === commandIndex ? 'text-text-inverted' : 'text-text-tertiary'}`}>
                              {command.icon}
                            </span>
                            <span>{command.name}</span>
                          </div>
                          {command.shortcut && (
                            <span className={`text-xs font-mono ${
                              selectedIndex === commandIndex 
                                ? 'text-primary-200' 
                                : 'text-text-tertiary'
                            }`}>
                              {command.shortcut}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;