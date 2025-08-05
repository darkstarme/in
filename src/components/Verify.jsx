import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Verify() {
  const { verify } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await verify({ email, code });
      toast.success('Verified! Now set up your pattern lock.');
      navigate('/setup-pattern');
    } catch {
      toast.error('Verification failed');
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 p-4">
      <form onSubmit={onSubmit} className="bg-surface p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl text-white text-center">Verify Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        <button type="submit" className="w-full bg-primary py-2 rounded text-white">
          Verify
        </button>
      </form>
    </div>
  );
}