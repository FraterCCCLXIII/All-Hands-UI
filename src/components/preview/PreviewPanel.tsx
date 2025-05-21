import React from 'react';
import { FiX, FiDownload, FiCopy, FiShare2 } from 'react-icons/fi';
import { Message } from '../../types/conversation';

interface PreviewPanelProps {
  message: Message | null;
  onClose: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ message, onClose }) => {
  if (!message) return null;
  
  const { type = 'text', content, timestamp, metadata } = message;
  
  return (
    <div className="fixed inset-y-0 right-0 z-40 w-96 bg-background-primary border-l border-border-primary shadow-xl flex flex-col transition-transform duration-300 transform">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-border-primary">
        <div>
          <h3 className="font-medium text-lg">Preview</h3>
          <p className="text-sm text-text-tertiary">{timestamp}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-md hover:bg-background-tertiary text-text-secondary"
          aria-label="Close preview"
        >
          <FiX size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {type === 'code' ? (
          <pre className="bg-background-tertiary p-4 rounded-md overflow-x-auto">
            <code>{content}</code>
          </pre>
        ) : type === 'image' ? (
          <div className="flex items-center justify-center">
            <img 
              src={content} 
              alt="Preview" 
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            {content}
          </div>
        )}
      </div>
      
      {/* Footer with actions */}
      <div className="p-4 border-t border-border-primary flex justify-end gap-2">
        {type === 'image' || type === 'file' ? (
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
            <FiDownload size={16} />
            <span>Download</span>
          </button>
        ) : type === 'code' ? (
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
            <FiCopy size={16} />
            <span>Copy Code</span>
          </button>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
            <FiShare2 size={16} />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;