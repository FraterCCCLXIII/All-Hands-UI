import React, { useState } from 'react';
import { FiArrowRight, FiCheck, FiCode, FiMessageSquare, FiSettings, FiFileText, FiGithub } from 'react-icons/fi';

interface WelcomeScreenProps {
  isOpen: boolean;
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    theme: 'system',
    primaryUse: '',
    experience: '',
    notifications: true,
  });

  const steps = [
    {
      title: 'Welcome to OpenHands',
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-text-primary">Welcome to OpenHands</h1>
          <p className="text-text-secondary text-lg">
            Your AI-powered coding assistant and knowledge partner. Let's set up your experience in a few quick steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <FeatureCard
              icon={<FiMessageSquare className="w-6 h-6" />}
              title="AI Chat"
              description="Get answers, explanations, and guidance through natural conversation."
            />
            <FeatureCard
              icon={<FiCode className="w-6 h-6" />}
              title="Code Assistant"
              description="Write, debug, and understand code with AI-powered help."
            />
            <FeatureCard
              icon={<FiFileText className="w-6 h-6" />}
              title="Knowledge Base"
              description="Access documentation and best practices for your projects."
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Choose Your Theme',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary">Choose Your Theme</h2>
          <p className="text-text-secondary">
            Select a theme that works best for your environment and preferences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <ThemeCard
              title="Light"
              description="Clean, bright interface ideal for daytime use."
              selected={preferences.theme === 'light'}
              onClick={() => setPreferences({ ...preferences, theme: 'light' })}
              previewClass="bg-white"
            />
            <ThemeCard
              title="Dark"
              description="Reduced eye strain in low-light environments."
              selected={preferences.theme === 'dark'}
              onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
              previewClass="bg-gray-900"
            />
            <ThemeCard
              title="Sepia"
              description="Warm tones for comfortable reading."
              selected={preferences.theme === 'sepia'}
              onClick={() => setPreferences({ ...preferences, theme: 'sepia' })}
              previewClass="bg-amber-50"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Primary Use',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary">How Will You Use OpenHands?</h2>
          <p className="text-text-secondary">
            This helps us tailor the experience to your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <SelectionCard
              title="Software Development"
              description="Code completion, debugging, and technical guidance."
              selected={preferences.primaryUse === 'development'}
              onClick={() => setPreferences({ ...preferences, primaryUse: 'development' })}
            />
            <SelectionCard
              title="Learning & Education"
              description="Explanations, tutorials, and learning resources."
              selected={preferences.primaryUse === 'learning'}
              onClick={() => setPreferences({ ...preferences, primaryUse: 'learning' })}
            />
            <SelectionCard
              title="Data Science & Analysis"
              description="Data processing, visualization, and model development."
              selected={preferences.primaryUse === 'data-science'}
              onClick={() => setPreferences({ ...preferences, primaryUse: 'data-science' })}
            />
            <SelectionCard
              title="General Assistance"
              description="Varied tasks across multiple domains."
              selected={preferences.primaryUse === 'general'}
              onClick={() => setPreferences({ ...preferences, primaryUse: 'general' })}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Experience Level',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary">Your Experience Level</h2>
          <p className="text-text-secondary">
            This helps us adjust explanations and suggestions to your knowledge level.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <SelectionCard
              title="Beginner"
              description="New to programming or the technologies you're using."
              selected={preferences.experience === 'beginner'}
              onClick={() => setPreferences({ ...preferences, experience: 'beginner' })}
            />
            <SelectionCard
              title="Intermediate"
              description="Comfortable with basics but learning advanced concepts."
              selected={preferences.experience === 'intermediate'}
              onClick={() => setPreferences({ ...preferences, experience: 'intermediate' })}
            />
            <SelectionCard
              title="Advanced"
              description="Experienced developer seeking specific, technical assistance."
              selected={preferences.experience === 'advanced'}
              onClick={() => setPreferences({ ...preferences, experience: 'advanced' })}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Final Steps',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary">You're All Set!</h2>
          <p className="text-text-secondary">
            Here are a few more things to help you get started.
          </p>
          
          <div className="mt-8 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                <FiGithub className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary">Connect GitHub</h3>
                <p className="text-text-secondary">Link your GitHub account to access repositories and collaborate.</p>
                <button className="mt-2 px-4 py-2 bg-background-tertiary text-text-secondary rounded-lg hover:bg-background-tertiary hover:text-text-primary transition-colors">
                  Connect
                </button>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                <FiSettings className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary">Notification Preferences</h3>
                <p className="text-text-secondary">Receive updates about new features and improvements.</p>
                <div className="mt-2 flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.notifications}
                      onChange={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                    />
                    <div className="w-11 h-6 bg-background-tertiary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    <span className="ml-3 text-sm font-medium text-text-secondary">
                      {preferences.notifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-background-secondary rounded-lg border border-border-primary">
            <p className="text-text-secondary">
              You can always adjust these settings later in your profile preferences.
            </p>
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-primary">
      <div className="w-full max-w-4xl bg-background-card rounded-xl shadow-xl border border-border-primary overflow-hidden">
        {/* Progress bar */}
        <div className="w-full h-1 bg-background-tertiary">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {steps[currentStep].content}
          
          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className={`px-6 py-2 rounded-lg text-text-secondary hover:text-text-primary transition-colors ${
                currentStep === 0 ? 'invisible' : ''
              }`}
            >
              Back
            </button>
            
            <button
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  onComplete();
                }
              }}
              className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  <span>Next</span>
                  <FiArrowRight />
                </>
              ) : (
                <>
                  <span>Get Started</span>
                  <FiCheck />
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Skip button */}
        <div className="p-4 border-t border-border-primary bg-background-secondary text-center">
          <button
            onClick={onComplete}
            className="text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Skip setup and use default settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper components
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="p-6 bg-background-secondary rounded-xl border border-border-primary hover:shadow-md transition-shadow">
    <div className="text-primary-500 mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);

const ThemeCard: React.FC<{
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  previewClass: string;
}> = ({ title, description, selected, onClick, previewClass }) => (
  <div
    className={`p-6 rounded-xl border transition-all cursor-pointer ${
      selected
        ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50'
        : 'border-border-primary hover:border-border-secondary'
    }`}
    onClick={onClick}
  >
    <div className={`w-full h-32 rounded-lg mb-4 ${previewClass}`}></div>
    <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);

const SelectionCard: React.FC<{
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}> = ({ title, description, selected, onClick }) => (
  <div
    className={`p-6 rounded-xl border transition-all cursor-pointer ${
      selected
        ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50 bg-primary-50 dark:bg-primary-900/20'
        : 'border-border-primary hover:border-border-secondary'
    }`}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </div>
      {selected && (
        <div className="bg-primary-500 text-white p-1 rounded-full">
          <FiCheck className="w-4 h-4" />
        </div>
      )}
    </div>
  </div>
);

export default WelcomeScreen;