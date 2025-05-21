import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, 
  FiX, 
  FiMessageSquare, 
  FiCode, 
  FiFile, 
  FiClock,
  FiArrowRight,
  FiExternalLink
} from 'react-icons/fi';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'conversation' | 'code' | 'file' | 'documentation';
  url?: string;
  timestamp?: string;
  icon: React.ReactNode;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResult) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'React hooks tutorial',
    'TypeScript interfaces',
    'Tailwind CSS configuration',
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: 'conv1',
      title: 'React Hooks Tutorial',
      description: 'Conversation about React hooks and their usage',
      type: 'conversation',
      timestamp: '2 days ago',
      icon: <FiMessageSquare className="text-blue-500" />,
    },
    {
      id: 'conv2',
      title: 'TypeScript Type Definitions',
      description: 'Discussion about TypeScript interfaces and types',
      type: 'conversation',
      timestamp: '1 week ago',
      icon: <FiMessageSquare className="text-blue-500" />,
    },
    {
      id: 'code1',
      title: 'useEffect Hook Example',
      description: 'Code snippet showing useEffect with cleanup',
      type: 'code',
      timestamp: '3 days ago',
      icon: <FiCode className="text-green-500" />,
    },
    {
      id: 'file1',
      title: 'Button.tsx',
      description: '/components/ui/Button.tsx',
      type: 'file',
      timestamp: 'Modified 1 day ago',
      icon: <FiFile className="text-yellow-500" />,
    },
    {
      id: 'doc1',
      title: 'React Hooks API Reference',
      description: 'Official documentation for React Hooks',
      type: 'documentation',
      url: 'https://reactjs.org/docs/hooks-reference.html',
      icon: <FiExternalLink className="text-purple-500" />,
    },
  ];

  // Filter results based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (result.description &&
            result.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setResults(filtered);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prevIndex) =>
            prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, results, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement;
      
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
        });
      }
    }
  }, [selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    onSelectResult(result);
    
    // Add to recent searches if it's not already there
    if (!recentSearches.includes(searchTerm) && searchTerm.trim()) {
      setRecentSearches((prev) => [searchTerm, ...prev.slice(0, 4)]);
    }
    
    onClose();
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-background-overlay backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-background-card rounded-xl shadow-xl border border-border-primary overflow-hidden">
        {/* Search input */}
        <div className="flex items-center px-4 py-3 border-b border-border-primary">
          <FiSearch className="text-text-tertiary mr-3" size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search conversations, code, files..."
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-tertiary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Results or recent searches */}
        <div 
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto"
        >
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="inline-block w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-text-secondary">Searching...</p>
            </div>
          ) : searchTerm ? (
            results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    data-index={index}
                    className={`px-4 py-3 cursor-pointer ${
                      selectedIndex === index
                        ? 'bg-primary-500 text-text-inverted'
                        : 'hover:bg-background-tertiary'
                    }`}
                    onClick={() => handleSelectResult(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 mr-3 mt-0.5 ${selectedIndex === index ? 'text-text-inverted' : ''}`}>
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium truncate">
                            {result.title}
                          </h3>
                          {result.timestamp && (
                            <span className={`ml-2 text-xs whitespace-nowrap ${
                              selectedIndex === index ? 'text-primary-200' : 'text-text-tertiary'
                            }`}>
                              {result.timestamp}
                            </span>
                          )}
                        </div>
                        {result.description && (
                          <p className={`mt-1 text-xs truncate ${
                            selectedIndex === index ? 'text-primary-200' : 'text-text-tertiary'
                          }`}>
                            {result.description}
                          </p>
                        )}
                      </div>
                      {result.type === 'documentation' && (
                        <FiArrowRight className={`ml-2 ${
                          selectedIndex === index ? 'text-text-inverted' : 'text-text-tertiary'
                        }`} size={16} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-text-secondary">No results found for "{searchTerm}"</p>
                <p className="mt-1 text-text-tertiary text-sm">
                  Try different keywords or check your spelling
                </p>
              </div>
            )
          ) : (
            <div className="py-2">
              {recentSearches.length > 0 ? (
                <>
                  <div className="px-4 py-2 flex items-center justify-between">
                    <h3 className="text-xs font-medium text-text-tertiary uppercase">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-primary-500 hover:text-primary-600"
                    >
                      Clear all
                    </button>
                  </div>
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 flex items-center hover:bg-background-tertiary cursor-pointer"
                      onClick={() => handleRecentSearchClick(term)}
                    >
                      <FiClock className="text-text-tertiary mr-3" size={16} />
                      <span className="text-text-secondary">{term}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-text-secondary">Start typing to search</p>
                  <p className="mt-1 text-text-tertiary text-sm">
                    Search for conversations, code snippets, files, and more
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border-primary bg-background-secondary text-xs text-text-tertiary">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block mr-4">
                <span className="font-mono bg-background-tertiary px-1.5 py-0.5 rounded">↑↓</span> to navigate
              </span>
              <span className="inline-block mr-4">
                <span className="font-mono bg-background-tertiary px-1.5 py-0.5 rounded">Enter</span> to select
              </span>
              <span className="inline-block">
                <span className="font-mono bg-background-tertiary px-1.5 py-0.5 rounded">Esc</span> to close
              </span>
            </div>
            <div>
              {results.length > 0 && searchTerm && (
                <span>{selectedIndex + 1} of {results.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;