import React from 'react';
import { useAuth } from '../../auth/AuthContext';

export default function TierSettings() {
  const { user, upgradeTier } = useAuth();
  const tiers: Array<'unverified'|'verified'|'pro'> = ['unverified','verified','pro'];

  return (
    <div className="space-y-4 text-gray-200">
      <h2 className="text-2xl text-white">Tier Settings</h2>
      <p>Current Tier: <strong className="text-primary">{user?.tier}</strong></p>
      <div className="space-x-2">
        {tiers.map(t => (
          <button
            key={t}
            onClick={() => upgradeTier(t)}
            className="bg-primary px-4 py-2 rounded text-white hover:bg-primary-dark"
          >
            Set {t}
          </button>
        ))}
      </div>
    </div>
  );
}