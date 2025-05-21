import React, { useState } from 'react';
import { 
  FiBell, 
  FiX, 
  FiCheck, 
  FiInfo, 
  FiAlertTriangle, 
  FiAlertCircle,
  FiSettings,
  FiTrash2,
  FiCheckCircle
} from 'react-icons/fi';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Feature Available',
      message: 'Try out our new code completion feature in the editor.',
      type: 'info',
      timestamp: '10 minutes ago',
      read: false,
      actionLabel: 'Try Now',
      actionUrl: '#',
    },
    {
      id: '2',
      title: 'Project Saved',
      message: 'Your project has been successfully saved to the cloud.',
      type: 'success',
      timestamp: '1 hour ago',
      read: true,
    },
    {
      id: '3',
      title: 'Session Expiring Soon',
      message: 'Your session will expire in 15 minutes. Please save your work.',
      type: 'warning',
      timestamp: '5 minutes ago',
      read: false,
      actionLabel: 'Extend Session',
      actionUrl: '#',
    },
    {
      id: '4',
      title: 'Failed to Deploy',
      message: 'Your project deployment failed. Check the logs for more details.',
      type: 'error',
      timestamp: '2 hours ago',
      read: false,
      actionLabel: 'View Logs',
      actionUrl: '#',
    },
    {
      id: '5',
      title: 'Weekly Summary',
      message: 'Your weekly activity summary is now available.',
      type: 'info',
      timestamp: '1 day ago',
      read: true,
      actionLabel: 'View Summary',
      actionUrl: '#',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(
    (notification) => filter === 'all' || !notification.read
  );

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <FiInfo className="text-status-info" />;
      case 'success':
        return <FiCheckCircle className="text-status-success" />;
      case 'warning':
        return <FiAlertTriangle className="text-status-warning" />;
      case 'error':
        return <FiAlertCircle className="text-status-error" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-background-card shadow-xl border-l border-border-primary overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-primary flex items-center justify-between">
        <div className="flex items-center">
          <FiBell className="mr-2 text-text-primary" size={20} />
          <h2 className="text-lg font-medium text-text-primary">Notifications</h2>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-500 text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="p-3 border-b border-border-primary flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                : 'hover:bg-background-tertiary text-text-secondary'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === 'unread'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                : 'hover:bg-background-tertiary text-text-secondary'
            }`}
          >
            Unread
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
            title="Mark all as read"
          >
            <FiCheck size={16} />
          </button>
          <button
            onClick={clearAll}
            className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
            title="Clear all"
          >
            <FiTrash2 size={16} />
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
            title="Notification settings"
          >
            <FiSettings size={16} />
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <FiBell className="text-text-tertiary mb-3" size={32} />
            <p className="text-text-secondary">No notifications to display</p>
            <p className="text-text-tertiary text-sm mt-1">
              {filter === 'unread'
                ? 'You have read all your notifications'
                : 'You have no notifications'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-primary">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 relative ${!notification.read ? 'bg-background-secondary' : ''}`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-medium text-text-primary">
                        {notification.title}
                      </h3>
                      <div className="flex items-center ml-2">
                        <span className="text-xs text-text-tertiary whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="ml-2 p-1 rounded-full hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
                          aria-label="Delete notification"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">
                      {notification.message}
                    </p>
                    {notification.actionLabel && (
                      <div className="mt-2">
                        <a
                          href={notification.actionUrl}
                          className="inline-flex items-center text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                        >
                          {notification.actionLabel}
                        </a>
                      </div>
                    )}
                    {!notification.read && (
                      <div className="mt-2">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center text-xs font-medium text-text-tertiary hover:text-text-secondary"
                        >
                          <FiCheck className="mr-1" size={12} />
                          Mark as read
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {!notification.read && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border-primary bg-background-secondary">
        <button className="w-full py-2 text-center text-sm text-text-secondary hover:text-text-primary transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;