import React, { useState } from 'react';
import UserManagement from './Admin/UserManagement';
import TierSettings   from './Admin/TierSettings';
import AISettings     from './Admin/AISettings';
import SystemSettings from './Admin/SystemSettings';
import AboutTab       from '../About';

const TABS = [
  { key: 'users',  label: 'Users',   Comp: UserManagement },
  { key: 'tiers',  label: 'Tiers',   Comp: TierSettings },
  { key: 'ai',     label: 'AI',      Comp: AISettings },
  { key: 'system', label: 'System',  Comp: SystemSettings },
  { key: 'about',  label: 'About',   Comp: AboutTab }
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<string>('users');
  const ActiveComp = TABS.find(t => t.key === tab)!.Comp;

  return (
    <div className="h-screen flex">
      <nav className="w-48 bg-surface p-4 text-gray-200">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`block w-full text-left px-3 py-2 mb-2 rounded ${
              t.key === tab ? 'bg-primary text-white' : 'hover:bg-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="flex-1 overflow-auto p-6 bg-gray-900">
        <ActiveComp />
      </main>
    </div>
  );
}