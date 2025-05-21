import React, { useState } from 'react';
import { 
  FiPlus, 
  FiGithub, 
  FiFolder, 
  FiCode, 
  FiFileText, 
  FiChevronRight,
  FiArrowRight,
  FiCheck
} from 'react-icons/fi';

interface EmptyStateProps {
  isOpen?: boolean;
  onCreateProject: () => void;
  onSelectFromGitHub: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  isOpen = false,
  onCreateProject, 
  onSelectFromGitHub 
}) => {
  if (!isOpen) return null;
  const [selectedOption, setSelectedOption] = useState<'create' | 'github' | null>(null);
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to OpenHands</h1>
        <p className="text-text-secondary text-lg">
          Let's get started by creating a new project or selecting an existing one from GitHub
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Create New Project */}
        <div 
          className={`border rounded-xl p-6 cursor-pointer transition-all ${
            selectedOption === 'create' 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
              : 'border-border-primary hover:border-primary-300 hover:shadow-sm'
          }`}
          onClick={() => setSelectedOption('create')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
              <FiPlus size={24} />
            </div>
            {selectedOption === 'create' && (
              <div className="p-1 bg-primary-500 rounded-full text-white">
                <FiCheck size={16} />
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
          <p className="text-text-secondary mb-4">
            Start from scratch with a new project. Choose from templates or begin with an empty project.
          </p>
          
          {selectedOption === 'create' && (
            <div className="mt-4 space-y-3">
              <div className="border border-border-primary rounded-lg p-3 hover:bg-background-secondary cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-400 mr-3">
                    <FiCode size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Empty Project</h3>
                    <p className="text-sm text-text-tertiary">Start with a blank slate</p>
                  </div>
                  <FiChevronRight className="text-text-tertiary" />
                </div>
              </div>
              
              <div className="border border-border-primary rounded-lg p-3 hover:bg-background-secondary cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md text-green-600 dark:text-green-400 mr-3">
                    <FiFileText size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">From Template</h3>
                    <p className="text-sm text-text-tertiary">Choose from starter templates</p>
                  </div>
                  <FiChevronRight className="text-text-tertiary" />
                </div>
              </div>
              
              <button 
                onClick={onCreateProject}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                <span>Continue</span>
                <FiArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
        
        {/* Select from GitHub */}
        <div 
          className={`border rounded-xl p-6 cursor-pointer transition-all ${
            selectedOption === 'github' 
              ? 'border-gray-500 bg-gray-50 dark:bg-gray-800/30 shadow-md' 
              : 'border-border-primary hover:border-gray-400 hover:shadow-sm'
          }`}
          onClick={() => setSelectedOption('github')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">
              <FiGithub size={24} />
            </div>
            {selectedOption === 'github' && (
              <div className="p-1 bg-gray-700 rounded-full text-white">
                <FiCheck size={16} />
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold mb-2">Select from GitHub</h2>
          <p className="text-text-secondary mb-4">
            Connect to GitHub and select an existing repository to work with.
          </p>
          
          {selectedOption === 'github' && (
            <div className="mt-4 space-y-3">
              <div className="border border-border-primary rounded-lg p-3 hover:bg-background-secondary cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 mr-3">
                    <FiGithub size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Connect GitHub Account</h3>
                    <p className="text-sm text-text-tertiary">Link your GitHub account</p>
                  </div>
                  <FiChevronRight className="text-text-tertiary" />
                </div>
              </div>
              
              <div className="border border-border-primary rounded-lg p-3 hover:bg-background-secondary cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 mr-3">
                    <FiFolder size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Browse Repositories</h3>
                    <p className="text-sm text-text-tertiary">Select from your repositories</p>
                  </div>
                  <FiChevronRight className="text-text-tertiary" />
                </div>
              </div>
              
              <button 
                onClick={onSelectFromGitHub}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors"
              >
                <span>Continue with GitHub</span>
                <FiArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-text-tertiary">
        <p>Need help? Check out our <a href="#" className="text-primary-500 hover:underline">documentation</a> or <a href="#" className="text-primary-500 hover:underline">contact support</a>.</p>
      </div>
    </div>
  );
};

export default EmptyState;