import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Test App</h1>
      <p className="mb-4">This is a simple test component to check if React is rendering correctly.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
    </div>
  );
};

export default TestApp;