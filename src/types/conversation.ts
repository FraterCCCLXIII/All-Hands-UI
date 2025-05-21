export interface ConversationItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error' | 'notification';
  content: string;
  timestamp: string;
  type?: MessageType;
  metadata?: Record<string, any>;
}

export type MessageType = 
  | 'text'
  | 'code'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'file'
  | 'image'
  | 'link'
  | 'action';