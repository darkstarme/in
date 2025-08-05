import React, { useState } from 'react';

export default function SystemSettings() {
  const env = localStorage.getItem('PATTERN_LOCK_ENABLED') ?? 'true';
  const [enabled, setEnabled] = useState(env === 'true');

  function toggle() {
    localStorage.setItem('PATTERN_LOCK_ENABLED', JSON.stringify(!enabled));
    setEnabled(!enabled);
  }

  return (
    <div className="space-y-4 text-gray-200">
      <h2 className="text-2xl text-white">System Settings</h2>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          className="mr-2"
        />
        Pattern Unlock Enabled
      </label>
    </div>
  );
}