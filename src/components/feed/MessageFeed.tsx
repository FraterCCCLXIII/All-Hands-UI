import React, { useState } from 'react';
import { Message } from '../../types/conversation';
import MessageCard from '../cards/MessageCard';
import PreviewPanel from '../preview/PreviewPanel';

interface MessageFeedProps {
  messages: Message[];
  onPreviewMessage?: (message: Message) => void;
}

const MessageFeed: React.FC<MessageFeedProps> = ({ 
  messages,
  onPreviewMessage 
}) => {
  const [previewMessage, setPreviewMessage] = useState<Message | null>(null);
  
  const handlePreview = (message: Message) => {
    if (onPreviewMessage) {
      onPreviewMessage(message);
    } else {
      setPreviewMessage(message);
    }
  };
  
  const closePreview = () => {
    setPreviewMessage(null);
  };
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
          <p className="text-lg mb-2">No messages yet</p>
          <p className="text-sm">Start a conversation to see messages here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageCard 
              key={message.id} 
              message={message} 
              onPreview={() => handlePreview(message)}
            />
          ))}
        </div>
      )}
      
      {previewMessage && (
        <PreviewPanel 
          message={previewMessage} 
          onClose={closePreview} 
        />
      )}
    </div>
  );
};

export default MessageFeed;