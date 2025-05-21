import React, { useState } from 'react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '',
  language = 'javascript',
  onChange,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border-primary dark:border-border-secondary">
      <div className="bg-background-secondary dark:bg-background-tertiary px-4 py-2 flex justify-between items-center border-b border-border-primary dark:border-border-secondary">
        <div className="text-sm font-medium text-text-secondary">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </div>
        {!readOnly && (
          <div className="flex space-x-2">
            <button
              className="text-xs px-2 py-1 rounded bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              onClick={() => {
                try {
                  // Format code (simple indentation for demo)
                  const formatted = code
                    .split('\n')
                    .map((line) => line.trim())
                    .join('\n');
                  setCode(formatted);
                  if (onChange) {
                    onChange(formatted);
                  }
                } catch (error) {
                  console.error('Error formatting code:', error);
                }
              }}
            >
              Format
            </button>
            <button
              className="text-xs px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
              onClick={() => {
                setCode('');
                if (onChange) {
                  onChange('');
                }
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        readOnly={readOnly}
        className="w-full bg-background-primary dark:bg-background-secondary text-text-primary font-mono text-sm p-4 min-h-[200px] focus:outline-none focus:ring-1 focus:ring-primary-500"
        placeholder={`Enter ${language} code here...`}
        spellCheck="false"
        style={{ tabSize: 2 }}
      />
    </div>
  );
};

export default CodeEditor;