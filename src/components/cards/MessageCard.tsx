import React from 'react';
import { 
  FiCode, 
  FiAlertCircle, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiInfo, 
  FiFile, 
  FiImage, 
  FiLink, 
  FiZap,
  FiMaximize2,
  FiCopy,
  FiShare2
} from 'react-icons/fi';
import { Message, MessageType } from '../../types/conversation';

interface MessageCardProps {
  message: Message;
  onPreview?: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onPreview }) => {
  const { type = 'text', role, content, timestamp, metadata } = message;
  
  // Determine if the card is expandable
  const isExpandable = type === 'code' || type === 'image' || metadata?.expandable;
  
  // Get icon based on message type
  const getIcon = () => {
    switch (type) {
      case 'code':
        return <FiCode className="text-blue-500" />;
      case 'error':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" />;
      case 'success':
        return <FiCheckCircle className="text-green-500" />;
      case 'info':
        return <FiInfo className="text-blue-500" />;
      case 'file':
        return <FiFile className="text-purple-500" />;
      case 'image':
        return <FiImage className="text-pink-500" />;
      case 'link':
        return <FiLink className="text-teal-500" />;
      case 'action':
        return <FiZap className="text-amber-500" />;
      default:
        return null;
    }
  };
  
  // Get background color based on message type
  const getBackgroundColor = () => {
    switch (type) {
      case 'code':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'file':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'image':
        return 'bg-pink-50 dark:bg-pink-900/20';
      case 'link':
        return 'bg-teal-50 dark:bg-teal-900/20';
      case 'action':
        return 'bg-amber-50 dark:bg-amber-900/20';
      default:
        return 'bg-background-secondary';
    }
  };
  
  // Get border color based on message type
  const getBorderColor = () => {
    switch (type) {
      case 'code':
        return 'border-blue-200 dark:border-blue-800';
      case 'error':
        return 'border-red-200 dark:border-red-800';
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-800';
      case 'success':
        return 'border-green-200 dark:border-green-800';
      case 'info':
        return 'border-blue-200 dark:border-blue-800';
      case 'file':
        return 'border-purple-200 dark:border-purple-800';
      case 'image':
        return 'border-pink-200 dark:border-pink-800';
      case 'link':
        return 'border-teal-200 dark:border-teal-800';
      case 'action':
        return 'border-amber-200 dark:border-amber-800';
      default:
        return 'border-border-primary';
    }
  };
  
  return (
    <div 
      className={`rounded-lg border ${getBorderColor()} ${getBackgroundColor()} p-4 mb-4 transition-all hover:shadow-md cursor-pointer`}
      onClick={onPreview}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium capitalize">{type}</span>
        </div>
        <span className="text-sm text-text-tertiary">{timestamp}</span>
      </div>
      
      {/* Card Content */}
      <div className="mb-3 max-w-3xl mx-auto">
        {type === 'code' ? (
          <pre className="bg-background-tertiary p-3 rounded-md overflow-x-auto">
            <code>{content}</code>
          </pre>
        ) : type === 'image' ? (
          <div className="relative">
            <img 
              src={content} 
              alt="Message attachment" 
              className="rounded-md max-h-40 object-cover"
              onClick={(e) => {
                e.stopPropagation();
                onPreview && onPreview();
              }}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview && onPreview();
                }}
                className="bg-background-primary p-2 rounded-full"
              >
                <FiMaximize2 />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-text-primary break-words max-w-prose">{content}</p>
        )}
      </div>
      
      {/* Card Actions */}
      <div className="flex justify-end gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Copy content logic here
            navigator.clipboard.writeText(content);
          }}
          className="p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-background-tertiary transition-colors"
          aria-label="Copy content"
        >
          <FiCopy size={16} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Share logic here
          }}
          className="p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-background-tertiary transition-colors"
          aria-label="Share"
        >
          <FiShare2 size={16} />
        </button>
        {isExpandable && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPreview && onPreview();
            }}
            className="p-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-background-tertiary transition-colors"
            aria-label="Expand"
          >
            <FiMaximize2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageCard;