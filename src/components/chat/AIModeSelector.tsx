import React, { useState } from 'react';
import { 
  FiActivity, 
  FiSearch, 
  FiCode, 
  FiCheckSquare, 
  FiDatabase, 
  FiEdit3, 
  FiTerminal,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

export enum AIMode {
  GENERAL = 'general',
  THINKING = 'thinking',
  RESEARCH = 'research',
  CODE = 'code',
  TEST = 'test',
  DATA = 'data',
  WRITING = 'writing',
  TERMINAL = 'terminal'
}

interface AIModeOption {
  id: AIMode;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const AI_MODE_OPTIONS: AIModeOption[] = [
  {
    id: AIMode.GENERAL,
    label: 'General',
    description: 'AI will respond to any type of request',
    icon: <FiActivity />
  },
  {
    id: AIMode.THINKING,
    label: 'Thinking',
    description: 'AI will focus on problem-solving and analysis',
    icon: <FiActivity />
  },
  {
    id: AIMode.RESEARCH,
    label: 'Research',
    description: 'AI will focus on finding and analyzing information',
    icon: <FiSearch />
  },
  {
    id: AIMode.CODE,
    label: 'Code',
    description: 'AI will focus on writing and explaining code',
    icon: <FiCode />
  },
  {
    id: AIMode.TEST,
    label: 'Test',
    description: 'AI will focus on testing and quality assurance',
    icon: <FiCheckSquare />
  },
  {
    id: AIMode.DATA,
    label: 'Data',
    description: 'AI will focus on data analysis and visualization',
    icon: <FiDatabase />
  },
  {
    id: AIMode.WRITING,
    label: 'Writing',
    description: 'AI will focus on writing and editing text',
    icon: <FiEdit3 />
  },
  {
    id: AIMode.TERMINAL,
    label: 'Terminal',
    description: 'AI will focus on terminal commands and operations',
    icon: <FiTerminal />
  }
];

interface AIModeSelectorProps {
  selectedMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const AIModeSelector: React.FC<AIModeSelectorProps> = ({ 
  selectedMode, 
  onModeChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = AI_MODE_OPTIONS.find(option => option.id === selectedMode) || AI_MODE_OPTIONS[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-background-secondary hover:bg-background-tertiary text-text-secondary transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-primary-500">
          {selectedOption.icon}
        </span>
        <span className="text-sm font-medium">{selectedOption.label}</span>
        <span className="text-text-tertiary">
          {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-background-card rounded-md shadow-lg border border-border-primary overflow-hidden z-50">
          <ul
            className="py-1 max-h-80 overflow-y-auto"
            role="listbox"
            aria-activedescendant={selectedMode}
          >
            {AI_MODE_OPTIONS.map((option) => (
              <li
                key={option.id}
                id={option.id}
                role="option"
                aria-selected={selectedMode === option.id}
                className={`px-3 py-2 cursor-pointer ${
                  selectedMode === option.id
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-background-tertiary text-text-secondary'
                }`}
                onClick={() => {
                  onModeChange(option.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className={selectedMode === option.id ? 'text-primary-500' : 'text-text-tertiary'}>
                    {option.icon}
                  </span>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-text-tertiary">{option.description}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIModeSelector;