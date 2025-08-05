import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { registry } from '../plugin-system/PluginRegistry';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const plugins = registry.list().filter(p => {
    const order = ['unverified','verified','pro','admin'];
    return order.indexOf(user!.tier) >= order.indexOf(p.minTier);
  });

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 bg-surface">
        <h1 className="text-2xl text-primary">Monicare</h1>
        <button onClick={logout} className="text-gray-300">Logout</button>
      </header>
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {plugins.map(p => (
          <div key={p.id} className="bg-surface p-4 rounded-lg shadow">
            <h3 className="font-semibold text-white">{p.name}</h3>
            <p className="text-gray-400">{p.description}</p>
            <button
              onClick={() => p.activate(user!)}
              className="mt-2 bg-primary text-white px-3 py-1 rounded"
            >
              Open
            </button>
          </div>
        ))}
        <PluginLoader />
      </main>
    </div>
  );
}