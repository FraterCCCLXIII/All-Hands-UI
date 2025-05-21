import React, { useState } from 'react';
import { FiX, FiUser, FiMail, FiGlobe, FiEdit2, FiSave, FiLogOut, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  website: string;
  location: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  preferences: {
    emailNotifications: boolean;
    desktopNotifications: boolean;
    weeklyDigest: boolean;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  // Mock user data
  const [userData, setUserData] = useState<UserData>({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    username: 'alexj',
    avatar: 'https://i.pravatar.cc/300',
    bio: 'Full-stack developer passionate about AI and machine learning. Working on open-source projects in my free time.',
    website: 'https://alexjohnson.dev',
    location: 'San Francisco, CA',
    socialLinks: {
      github: 'github.com/alexj',
      twitter: 'twitter.com/alexj',
      linkedin: 'linkedin.com/in/alexj',
    },
    preferences: {
      emailNotifications: true,
      desktopNotifications: false,
      weeklyDigest: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData>(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setEditedData({
        ...editedData,
        [section]: {
          ...editedData[section as keyof UserData],
          [field]: value,
        },
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const [section, field] = name.split('.');
    
    setEditedData({
      ...editedData,
      [section]: {
        ...editedData[section as keyof UserData],
        [field]: checked,
      },
    });
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-overlay backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-background-card rounded-xl shadow-xl border border-border-primary overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary">User Profile</h2>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary-500 text-text-inverted rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <FiSave size={16} />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1.5 bg-background-tertiary text-text-secondary rounded-lg hover:bg-background-tertiary hover:text-text-primary transition-colors"
                >
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-background-tertiary text-text-secondary rounded-lg hover:bg-background-tertiary hover:text-text-primary transition-colors"
              >
                <FiEdit2 size={16} />
                <span>Edit</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Avatar and basic info */}
            <div className="md:col-span-1 space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={isEditing ? editedData.avatar : userData.avatar}
                    alt="User avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-background-primary shadow-md"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full shadow-md hover:bg-primary-600 transition-colors">
                      <FiEdit2 size={16} />
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="avatar"
                    value={editedData.avatar}
                    onChange={handleInputChange}
                    className="mt-4 w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-sm text-text-primary"
                    placeholder="Avatar URL"
                  />
                ) : (
                  <h3 className="mt-4 text-xl font-semibold text-text-primary">{userData.name}</h3>
                )}
                {!isEditing && <p className="text-text-secondary">@{userData.username}</p>}
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-medium text-text-primary">Social Links</h4>
                <div className="space-y-3">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-2">
                        <FiGithub className="text-text-tertiary" />
                        <input
                          type="text"
                          name="socialLinks.github"
                          value={editedData.socialLinks.github || ''}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-sm text-text-primary"
                          placeholder="GitHub URL"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <FiTwitter className="text-text-tertiary" />
                        <input
                          type="text"
                          name="socialLinks.twitter"
                          value={editedData.socialLinks.twitter || ''}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-sm text-text-primary"
                          placeholder="Twitter URL"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <FiLinkedin className="text-text-tertiary" />
                        <input
                          type="text"
                          name="socialLinks.linkedin"
                          value={editedData.socialLinks.linkedin || ''}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-sm text-text-primary"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {userData.socialLinks.github && (
                        <a
                          href={`https://${userData.socialLinks.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          <FiGithub />
                          <span>{userData.socialLinks.github}</span>
                        </a>
                      )}
                      {userData.socialLinks.twitter && (
                        <a
                          href={`https://${userData.socialLinks.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          <FiTwitter />
                          <span>{userData.socialLinks.twitter}</span>
                        </a>
                      )}
                      {userData.socialLinks.linkedin && (
                        <a
                          href={`https://${userData.socialLinks.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          <FiLinkedin />
                          <span>{userData.socialLinks.linkedin}</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border-primary">
                <button className="flex items-center gap-2 text-status-error hover:text-red-700 transition-colors">
                  <FiLogOut />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Right column - Details and preferences */}
            <div className="md:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-text-primary">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-text-primary"
                      />
                    ) : (
                      <p className="text-text-primary">{userData.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">Username</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={editedData.username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-text-primary"
                      />
                    ) : (
                      <p className="text-text-primary">@{userData.username}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-text-primary"
                      />
                    ) : (
                      <p className="text-text-primary">{userData.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editedData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-text-primary"
                      />
                    ) : (
                      <p className="text-text-primary">{userData.location}</p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={editedData.website}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-text-primary"
                      />
                    ) : (
                      <a
                        href={userData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        {userData.website}
                      </a>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-text-secondary">Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={editedData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 bg-background-tertiary border border-border-primary rounded-md text-text-primary"
                      />
                    ) : (
                      <p className="text-text-primary">{userData.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4 pt-4 border-t border-border-primary">
                <h4 className="text-lg font-medium text-text-primary">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-text-secondary">Email Notifications</label>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                      <input
                        type="checkbox"
                        name="preferences.emailNotifications"
                        checked={isEditing ? editedData.preferences.emailNotifications : userData.preferences.emailNotifications}
                        onChange={handleToggleChange}
                        disabled={!isEditing}
                        className="opacity-0 w-0 h-0"
                      />
                      <span
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                          (isEditing ? editedData.preferences.emailNotifications : userData.preferences.emailNotifications)
                            ? 'bg-primary-500'
                            : 'bg-background-tertiary'
                        }`}
                      >
                        <span
                          className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ${
                            (isEditing ? editedData.preferences.emailNotifications : userData.preferences.emailNotifications)
                              ? 'transform translate-x-6'
                              : ''
                          }`}
                        ></span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-text-secondary">Desktop Notifications</label>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                      <input
                        type="checkbox"
                        name="preferences.desktopNotifications"
                        checked={isEditing ? editedData.preferences.desktopNotifications : userData.preferences.desktopNotifications}
                        onChange={handleToggleChange}
                        disabled={!isEditing}
                        className="opacity-0 w-0 h-0"
                      />
                      <span
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                          (isEditing ? editedData.preferences.desktopNotifications : userData.preferences.desktopNotifications)
                            ? 'bg-primary-500'
                            : 'bg-background-tertiary'
                        }`}
                      >
                        <span
                          className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ${
                            (isEditing ? editedData.preferences.desktopNotifications : userData.preferences.desktopNotifications)
                              ? 'transform translate-x-6'
                              : ''
                          }`}
                        ></span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-text-secondary">Weekly Digest</label>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                      <input
                        type="checkbox"
                        name="preferences.weeklyDigest"
                        checked={isEditing ? editedData.preferences.weeklyDigest : userData.preferences.weeklyDigest}
                        onChange={handleToggleChange}
                        disabled={!isEditing}
                        className="opacity-0 w-0 h-0"
                      />
                      <span
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                          (isEditing ? editedData.preferences.weeklyDigest : userData.preferences.weeklyDigest)
                            ? 'bg-primary-500'
                            : 'bg-background-tertiary'
                        }`}
                      >
                        <span
                          className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ${
                            (isEditing ? editedData.preferences.weeklyDigest : userData.preferences.weeklyDigest)
                              ? 'transform translate-x-6'
                              : ''
                          }`}
                        ></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;