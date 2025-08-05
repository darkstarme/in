import React, { useState } from 'react';

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <div className="fixed inset-0 bg-backdrop flex items-center justify-center z-50">
      <div className="bg-surface p-6 rounded-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <i className="fas fa-times"></i>
        </button>
        <h3 className="text-xl text-white mb-2">Contact Darkstar</h3>
        <p className="text-gray-400">Email: drkstr.ltd@gmail.com</p>
        <button
          onClick={() => setShowEgg(true)}
          className="mt-4 bg-primary px-4 py-2 rounded text-white hover:bg-primary-dark"
        >
          Show ROSS+JOE
        </button>
        {showEgg && (
          <div className="mt-4 p-4 bg-gray-700 rounded animate-pulse text-center">
            <span className="text-2xl text-primary font-bold">ROSS+JOE</span>
          </div>
        )}
      </div>
    </div>
  );
}