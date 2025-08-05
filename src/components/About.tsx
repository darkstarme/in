import React, { useState } from 'react';
import ContactModal from './ContactModal';

export default function About() {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4 text-gray-200">
      <h2 className="text-2xl text-white">About Monicare</h2>
      <p>Darkstar presents Monicare—a modular, tiered dev command center.</p>
      <ul className="list-disc ml-6">
        <li>Tiered user access: Unverified, Verified, Pro, Admin</li>
        <li>Pattern-based lock screen</li>
        <li>Plugin architecture—for AI, Vault, SSH, and more</li>
        <li>Multi-model AI console: Copilot, Gemini, Claude, etc.</li>
        <li>Full Admin Dashboard with user management</li>
      </ul>
      <button
        onClick={() => setShow(true)}
        className="mt-4 inline-flex items-center text-primary hover:underline"
      >
        <i className="fas fa-info-circle mr-2"></i>Contact Us
      </button>
      {show && <ContactModal onClose={() => setShow(false)} />}
    </div>
  );
}