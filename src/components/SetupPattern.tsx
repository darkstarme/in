import React, { useState } from 'react';
import { usePatternLock } from '../hooks/usePatternLock';
import { useNavigate } from 'react-router-dom';
import PatternLock from 'react-pattern-lock';

export default function SetupPattern() {
  const { save } = usePatternLock();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-surface p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="text-2xl text-white mb-4">Draw an unlock pattern</h2>
        <PatternLock
          width={300}
          size={3}
          onChange={pattern => {
            if (pattern.length < 4) {
              setError('At least 4 dots required');
              return;
            }
            save(pattern.join('-'));
            navigate('/app');
          }}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  );
}