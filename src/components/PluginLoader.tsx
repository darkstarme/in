import React, { useState } from 'react';
import { registry } from '../plugin-system/PluginRegistry';
import { toast } from 'react-toastify';

export default function PluginLoader() {
  const [url, setUrl] = useState('');

  async function onLoad() {
    try {
      const mod = await import(/* @vite-ignore */ url);
      registry.register(mod.default);
      toast.success('Plugin loaded');
      setUrl('');
    } catch {
      toast.error('Failed to load plugin');
    }
  }

  return (
    <div className="bg-surface p-4 rounded-lg shadow">
      <h3 className="text-white font-semibold">Load Plugin</h3>
      <input
        type="url"
        placeholder="Plugin URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="w-full mt-2 px-3 py-2 rounded bg-gray-700 text-white"
      />
      <button onClick={onLoad} className="mt-2 bg-primary text-white px-3 py-1 rounded">
        Load
      </button>
    </div>
  );
}