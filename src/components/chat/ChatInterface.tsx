import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  initialMessages?: any[];
  onSendMessage?: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialMessages = [],
  onSendMessage,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    
    // If onSendMessage is provided, call it
    if (onSendMessage) {
      onSendMessage(content);
      setIsProcessing(false);
    } else {
      // This branch is not used in the current implementation
      // but kept for backward compatibility
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isProcessing}
        placeholder="Type a message..."
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;