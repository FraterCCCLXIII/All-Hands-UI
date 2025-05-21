import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSend, 
  FiGithub, 
  FiPlay, 
  FiSquare, 
  FiCpu,
  FiLink,
  FiUnlink,
  FiActivity
} from 'react-icons/fi';
import { AIMode } from './FixedAIModeSelector';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isAgentConnected?: boolean;
  isProcessRunning?: boolean;
  onStartProcess?: () => void;
  onStopProcess?: () => void;
  onConnectGitHub?: () => void;
  isGitHubConnected?: boolean;
}

const FixedChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Type a message...',
  disabled = false,
  isAgentConnected = true,
  isProcessRunning = false,
  onStartProcess = () => {},
  onStopProcess = () => {},
  onConnectGitHub = () => {},
  isGitHubConnected = false,
}) => {
  const [message, setMessage] = useState('');
  const [aiMode, setAIMode] = useState<AIMode>(AIMode.GENERAL);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Controls bar */}
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          {/* Agent connection status */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
            isAgentConnected 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
          }`}>
            <FiCpu size={14} />
            <span>{isAgentConnected ? 'Agent Connected' : 'Agent Disconnected'}</span>
          </div>
          
          {/* GitHub connection */}
          <button
            onClick={onConnectGitHub}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
              isGitHubConnected 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
            title={isGitHubConnected ? 'GitHub Connected' : 'Connect GitHub'}
          >
            <FiGithub size={14} />
            <span>{isGitHubConnected ? 'GitHub Connected' : 'Connect GitHub'}</span>
            {isGitHubConnected ? <FiUnlink size={12} /> : <FiLink size={12} />}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Start/Stop process */}
          <button
            onClick={isProcessRunning ? onStopProcess : onStartProcess}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
              isProcessRunning 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' 
                : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
            }`}
            title={isProcessRunning ? 'Stop Process' : 'Start Process'}
          >
            {isProcessRunning ? <FiSquare size={14} /> : <FiPlay size={14} />}
            <span>{isProcessRunning ? 'Stop' : 'Start'}</span>
          </button>
          
          {/* AI Mode Selector (simplified) */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-background-secondary hover:bg-background-tertiary text-text-secondary transition-colors"
            >
              <span className="text-primary-500">
                <FiActivity />
              </span>
              <span className="text-sm font-medium">General</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end border border-border-primary dark:border-border-secondary rounded-lg p-2 bg-background-secondary dark:bg-background-tertiary shadow-sm"
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-grow resize-none bg-transparent border-0 focus:ring-0 focus:outline-none text-text-primary dark:text-text-primary p-2 min-h-[40px] max-h-[200px] overflow-y-auto"
          rows={1}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`ml-2 p-2 rounded-md ${
            !message.trim() || disabled
              ? 'bg-secondary-200 text-secondary-500 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          } transition-colors`}
          title="Send message"
        >
          <FiSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default FixedChatInput;