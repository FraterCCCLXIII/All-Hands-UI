import React from 'react';
import { FiX } from 'react-icons/fi';

interface ShortcutGroup {
  title: string;
  shortcuts: {
    keys: string;
    description: string;
  }[];
}

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const shortcutGroups: ShortcutGroup[] = [
    {
      title: 'General',
      shortcuts: [
        { keys: '⌘K', description: 'Open command palette' },
        { keys: '⌘/', description: 'Show keyboard shortcuts' },
        { keys: '⌘,', description: 'Open settings' },
        { keys: 'Esc', description: 'Close modal / Cancel' },
      ],
    },
    {
      title: 'Navigation',
      shortcuts: [
        { keys: '⌘1', description: 'Switch to Chat tab' },
        { keys: '⌘2', description: 'Switch to Code Editor tab' },
        { keys: '⌘[', description: 'Navigate back' },
        { keys: '⌘]', description: 'Navigate forward' },
      ],
    },
    {
      title: 'Conversations',
      shortcuts: [
        { keys: '⌘N', description: 'New conversation' },
        { keys: '⌘⇧S', description: 'Save conversation' },
        { keys: '⌘⇧D', description: 'Delete conversation' },
        { keys: '⌘⇧R', description: 'Rename conversation' },
      ],
    },
    {
      title: 'Editor',
      shortcuts: [
        { keys: '⌘Enter', description: 'Run code' },
        { keys: '⌘S', description: 'Save file' },
        { keys: '⌘F', description: 'Find in file' },
        { keys: '⌘⇧F', description: 'Find in all files' },
        { keys: 'Tab', description: 'Indent' },
        { keys: '⇧Tab', description: 'Outdent' },
      ],
    },
    {
      title: 'Chat',
      shortcuts: [
        { keys: '⌘⇧C', description: 'Clear chat' },
        { keys: 'Enter', description: 'Send message' },
        { keys: '⇧Enter', description: 'New line' },
        { keys: '↑', description: 'Edit last message' },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-background-card rounded-xl shadow-xl border border-border-primary overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shortcutGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">{group.title}</h3>
                <div className="space-y-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-text-secondary">{shortcut.description}</span>
                      <kbd className="px-3 py-1.5 bg-background-tertiary border border-border-primary rounded-md font-mono text-sm text-text-primary shadow-sm">
                        {shortcut.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-border-primary bg-background-secondary">
          <p className="text-sm text-text-tertiary">
            Note: On Windows and Linux, replace ⌘ with Ctrl and ⌥ with Alt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;