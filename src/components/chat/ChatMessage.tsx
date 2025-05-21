import React from 'react';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  const isSystem = role === 'system';

  return (
    <div
      className={`flex w-full mb-4 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex max-w-[80%] ${
          isSystem
            ? 'w-full bg-secondary-100 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700'
            : isUser
            ? 'bg-primary-500 text-white'
            : 'bg-background-secondary border border-border-primary'
        } rounded-lg p-4 shadow-sm`}
      >
        <div className="flex-shrink-0 mr-3">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white">
              U
            </div>
          ) : isSystem ? (
            <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center text-white">
              S
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
              AI
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="font-medium mr-2">
              {isUser ? 'You' : isSystem ? 'System' : 'Assistant'}
            </span>
            {timestamp && (
              <span className="text-xs text-text-tertiary">{timestamp}</span>
            )}
          </div>
          <div className="prose prose-sm max-w-none">
            {content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;