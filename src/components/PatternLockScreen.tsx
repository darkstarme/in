import React, { useState } from 'react';
import PatternLock from 'react-pattern-lock';

export default function PatternLockScreen({ onUnlock }: { onUnlock: () => void }) {
  const saved = localStorage.getItem('monicarePattern')!;
  const [error, setError] = useState('');

  return (
    <div className="fixed inset-0 bg-backdrop flex items-center justify-center z-50">
      <div className="bg-surface p-8 rounded-lg text-center">
        <h2 className="text-2xl text-white mb-4">Enter Unlock Pattern</h2>
        <PatternLock
          width={300}
          size={3}
          onChange={pattern => {
            if (pattern.join('-') === saved) onUnlock();
            else setError('Incorrect pattern');
          }}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  );
}