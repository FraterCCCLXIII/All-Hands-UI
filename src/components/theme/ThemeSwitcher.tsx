import React from 'react';
import { useTheme, ThemeType } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoBookOutline } from 'react-icons/io5';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <FiSun className="w-5 h-5" /> },
    { value: 'dark', label: 'Dark', icon: <FiMoon className="w-5 h-5" /> },
    { value: 'sepia', label: 'Sepia', icon: <IoBookOutline className="w-5 h-5" /> },
  ];

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-background-card shadow-sm">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            theme === t.value
              ? 'bg-primary-500 text-text-inverted shadow-md'
              : 'hover:bg-background-tertiary text-text-secondary hover:text-text-primary'
          }`}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
        >
          <span className="flex items-center justify-center">{t.icon}</span>
          <span className="text-sm font-medium">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;