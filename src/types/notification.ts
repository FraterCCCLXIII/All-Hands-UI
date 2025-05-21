export enum NotificationType {
  // System notifications
  SYSTEM_INFO = 'system_info',
  SYSTEM_WARNING = 'system_warning',
  SYSTEM_ERROR = 'system_error',
  SYSTEM_SUCCESS = 'system_success',
  
  // Connection notifications
  CONNECTION_ESTABLISHED = 'connection_established',
  CONNECTION_LOST = 'connection_lost',
  CONNECTION_RECONNECTING = 'connection_reconnecting',
  
  // Agent notifications
  AGENT_CONNECTED = 'agent_connected',
  AGENT_DISCONNECTED = 'agent_disconnected',
  AGENT_THINKING = 'agent_thinking',
  AGENT_WORKING = 'agent_working',
  AGENT_IDLE = 'agent_idle',
  
  // Task notifications
  TASK_STARTED = 'task_started',
  TASK_COMPLETED = 'task_completed',
  TASK_FAILED = 'task_failed',
  TASK_CANCELLED = 'task_cancelled',
  
  // GitHub notifications
  GITHUB_CONNECTED = 'github_connected',
  GITHUB_DISCONNECTED = 'github_disconnected',
  GITHUB_PR_CREATED = 'github_pr_created',
  GITHUB_PR_UPDATED = 'github_pr_updated',
  GITHUB_PR_MERGED = 'github_pr_merged',
  GITHUB_PR_CLOSED = 'github_pr_closed',
  GITHUB_COMMIT_PUSHED = 'github_commit_pushed',
  
  // User account notifications
  USER_SIGNED_IN = 'user_signed_in',
  USER_SIGNED_OUT = 'user_signed_out',
  USER_PROFILE_UPDATED = 'user_profile_updated',
  
  // Resource notifications
  RESOURCE_CREATED = 'resource_created',
  RESOURCE_UPDATED = 'resource_updated',
  RESOURCE_DELETED = 'resource_deleted',
  
  // Billing notifications
  BILLING_PAYMENT_SUCCESS = 'billing_payment_success',
  BILLING_PAYMENT_FAILED = 'billing_payment_failed',
  BILLING_SUBSCRIPTION_UPDATED = 'billing_subscription_updated',
  BILLING_SUBSCRIPTION_EXPIRED = 'billing_subscription_expired',
  
  // Feature notifications
  FEATURE_ENABLED = 'feature_enabled',
  FEATURE_DISABLED = 'feature_disabled',
  FEATURE_UPDATED = 'feature_updated',
  
  // Update notifications
  UPDATE_AVAILABLE = 'update_available',
  UPDATE_INSTALLED = 'update_installed',
  UPDATE_FAILED = 'update_failed'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum NotificationDuration {
  SHORT = 3000,  // 3 seconds
  MEDIUM = 5000, // 5 seconds
  LONG = 8000,   // 8 seconds
  PERSISTENT = -1 // Requires manual dismissal
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  priority: NotificationPriority;
  duration: NotificationDuration;
  read: boolean;
  actionable: boolean;
  actionLabel?: string;
  actionUrl?: string;
  actionCallback?: () => void;
  metadata?: Record<string, any>;
}