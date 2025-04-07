import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PracticePage = () => {
  const { operation } = useParams();
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [result, setResult] = useState([]);

  const calculateResult = (operation, a, b) => {
    switch (operation) {
      case 'union':
        return [...new Set([...a, ...b])];
      case 'intersection':
        return a.filter(item => b.includes(item));
      case 'difference':
        return a.filter(item => !b.includes(item));
      case 'complement':
        const universal = Array.from({length: 10}, (_, i) => i + 1);
        return universal.filter(item => !a.includes(item));
      case 'symmetric-difference':
        return [...a.filter(item => !b.includes(item)), 
                ...b.filter(item => !a.includes(item))];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Interactive Practice: {operation}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Set A</label>
              <input
                type="text"
                placeholder="Enter numbers separated by commas"
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
                onChange={(e) => {
                  const values = e.target.value.split(',').map(v => v.trim());
                  setSetA(values);
                }}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Set B</label>
              <input
                type="text"
                placeholder="Enter numbers separated by commas"
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
                onChange={(e) => {
                  const values = e.target.value.split(',').map(v => v.trim());
                  setSetB(values);
                }}
              />
            </div>
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium"
              onClick={() => setResult(calculateResult(operation, setA, setB))}
            >
              Calculate Result
            </button>
          </div>

          {/* Result Section */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-400">Result</h2>
            <div className="bg-gray-800 rounded-lg p-4">
              {result.length > 0 ? (
                <p className="text-blue-300">&#123;{result.join(', ')}&#125;</p>
              ) : (
                <p className="text-gray-400">Result will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;