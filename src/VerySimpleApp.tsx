import React, { useState } from 'react';

const VerySimpleApp: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Very Simple App</h1>
      <p className="mb-4">Count: {count}</p>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default VerySimpleApp;