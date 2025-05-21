import React, { useState } from 'react';
import { 
  FiFolder, 
  FiFile, 
  FiChevronRight, 
  FiChevronDown, 
  FiPlus, 
  FiUpload, 
  FiDownload, 
  FiTrash2, 
  FiEdit2, 
  FiRefreshCw,
  FiSearch,
  FiCode,
  FiImage,
  FiFileText,
  FiPackage,
  FiDatabase,
  FiMoreVertical
} from 'react-icons/fi';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  size?: string;
  lastModified?: string;
  children?: FileItem[];
}

interface FileExplorerProps {
  onFileSelect: (file: FileItem) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onFileSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root': true,
    'src': true,
  });
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    fileId: string;
  } | null>(null);

  // Mock file structure
  const files: FileItem = {
    id: 'root',
    name: 'project',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
              {
                id: 'button',
                name: 'Button.tsx',
                type: 'file',
                extension: 'tsx',
                size: '2.4 KB',
                lastModified: '2 days ago',
              },
              {
                id: 'input',
                name: 'Input.tsx',
                type: 'file',
                extension: 'tsx',
                size: '1.8 KB',
                lastModified: '3 days ago',
              },
            ],
          },
          {
            id: 'app',
            name: 'App.tsx',
            type: 'file',
            extension: 'tsx',
            size: '3.2 KB',
            lastModified: '1 day ago',
          },
          {
            id: 'index',
            name: 'index.tsx',
            type: 'file',
            extension: 'tsx',
            size: '0.5 KB',
            lastModified: '1 day ago',
          },
        ],
      },
      {
        id: 'public',
        name: 'public',
        type: 'folder',
        children: [
          {
            id: 'favicon',
            name: 'favicon.ico',
            type: 'file',
            extension: 'ico',
            size: '4.2 KB',
            lastModified: '1 week ago',
          },
          {
            id: 'logo',
            name: 'logo.png',
            type: 'file',
            extension: 'png',
            size: '24.6 KB',
            lastModified: '1 week ago',
          },
        ],
      },
      {
        id: 'package',
        name: 'package.json',
        type: 'file',
        extension: 'json',
        size: '1.2 KB',
        lastModified: '2 days ago',
      },
      {
        id: 'tsconfig',
        name: 'tsconfig.json',
        type: 'file',
        extension: 'json',
        size: '0.8 KB',
        lastModified: '1 week ago',
      },
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        extension: 'md',
        size: '3.5 KB',
        lastModified: '3 days ago',
      },
    ],
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file.id);
      onFileSelect(file);
    } else {
      toggleFolder(file.id);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      fileId,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <FiFolder className="text-yellow-500" />;
    }

    switch (file.extension) {
      case 'tsx':
      case 'jsx':
      case 'ts':
      case 'js':
        return <FiCode className="text-blue-500" />;
      case 'json':
        return <FiDatabase className="text-green-500" />;
      case 'md':
        return <FiFileText className="text-gray-500" />;
      case 'png':
      case 'jpg':
      case 'ico':
      case 'svg':
        return <FiImage className="text-purple-500" />;
      case 'zip':
      case 'tar':
      case 'gz':
        return <FiPackage className="text-orange-500" />;
      default:
        return <FiFile className="text-gray-400" />;
    }
  };

  // Recursive function to render file tree
  const renderFileTree = (item: FileItem, depth = 0) => {
    // Skip items that don't match search term
    if (
      searchTerm &&
      !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.type === 'file'
    ) {
      return null;
    }

    const isExpanded = expandedFolders[item.id] || false;
    const isSelected = selectedFile === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 rounded-md cursor-pointer ${
            isSelected
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
              : 'hover:bg-background-tertiary'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => handleFileClick(item)}
          onContextMenu={(e) => handleContextMenu(e, item.id)}
        >
          <div className="w-5 mr-1 flex-shrink-0">
            {item.type === 'folder' && hasChildren ? (
              isExpanded ? (
                <FiChevronDown className="text-text-tertiary" size={16} />
              ) : (
                <FiChevronRight className="text-text-tertiary" size={16} />
              )
            ) : (
              <span className="w-4"></span>
            )}
          </div>
          <div className="mr-2 flex-shrink-0">{getFileIcon(item)}</div>
          <span className="truncate">{item.name}</span>
        </div>

        {item.type === 'folder' && isExpanded && item.children && (
          <div>
            {item.children.map((child) => renderFileTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Filter function for search
  const filterFiles = (items: FileItem[], term: string): FileItem[] => {
    if (!term) return items;

    return items
      .map((item) => {
        if (item.name.toLowerCase().includes(term.toLowerCase())) {
          return item;
        }

        if (item.type === 'folder' && item.children) {
          const filteredChildren = filterFiles(item.children, term);
          if (filteredChildren.length > 0) {
            return {
              ...item,
              children: filteredChildren,
            };
          }
        }

        return null;
      })
      .filter((item): item is FileItem => item !== null);
  };

  return (
    <div className="h-full flex flex-col border-r border-border-primary">
      {/* Header */}
      <div className="p-3 border-b border-border-primary">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-text-primary">Files</h3>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors">
              <FiPlus size={16} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors">
              <FiUpload size={16} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary hover:text-text-primary transition-colors">
              <FiRefreshCw size={16} />
            </button>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            className="w-full pl-8 pr-3 py-1.5 bg-background-tertiary border border-border-primary rounded-md text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-2.5 top-2.5 text-text-tertiary" size={16} />
        </div>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {renderFileTree(files)}
      </div>

      {/* Context menu */}
      {contextMenu && contextMenu.visible && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={closeContextMenu}
          />
          <div
            className="absolute z-50 bg-background-card rounded-lg shadow-lg border border-border-primary py-1 w-48"
            style={{
              top: contextMenu.y,
              left: contextMenu.x,
            }}
          >
            <button className="w-full text-left px-4 py-2 hover:bg-background-tertiary flex items-center">
              <FiEdit2 className="mr-2" size={14} />
              <span>Rename</span>
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-background-tertiary flex items-center">
              <FiDownload className="mr-2" size={14} />
              <span>Download</span>
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-background-tertiary flex items-center">
              <FiTrash2 className="mr-2 text-status-error" size={14} />
              <span className="text-status-error">Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileExplorer;