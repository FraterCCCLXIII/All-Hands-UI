import React from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import ThemeSwitcher from '../theme/ThemeSwitcher';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background-primary rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border-primary">
          <h3 className="font-medium text-lg">Settings</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-background-tertiary text-text-secondary"
            aria-label="Close settings"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-6">
            {/* Theme Settings */}
            <div>
              <h4 className="text-md font-medium mb-3">Theme</h4>
              <div className="bg-background-secondary p-4 rounded-lg">
                <ThemeSwitcher />
              </div>
            </div>
            
            {/* Notification Settings */}
            <div>
              <h4 className="text-md font-medium mb-3">Notifications</h4>
              <div className="bg-background-secondary p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="notify-messages" className="text-sm">
                    New messages
                  </label>
                  <input 
                    type="checkbox" 
                    id="notify-messages" 
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="notify-mentions" className="text-sm">
                    Mentions
                  </label>
                  <input 
                    type="checkbox" 
                    id="notify-mentions" 
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="notify-updates" className="text-sm">
                    System updates
                  </label>
                  <input 
                    type="checkbox" 
                    id="notify-updates" 
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
            
            {/* Display Settings */}
            <div>
              <h4 className="text-md font-medium mb-3">Display</h4>
              <div className="bg-background-secondary p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="compact-view" className="text-sm">
                    Compact view
                  </label>
                  <input 
                    type="checkbox" 
                    id="compact-view" 
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="show-timestamps" className="text-sm">
                    Show timestamps
                  </label>
                  <input 
                    type="checkbox" 
                    id="show-timestamps" 
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with actions */}
        <div className="p-4 border-t border-border-primary flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-border-primary rounded-md hover:bg-background-tertiary transition-colors"
          >
            Cancel
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
          >
            <FiSave size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;