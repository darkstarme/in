import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const logoRef = useRef<HTMLDivElement>(null);
  const taps = useRef<number[]>([]);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onLogoClick() {
    const now = Date.now();
    taps.current = taps.current.filter(t => now - t < 1000);
    taps.current.push(now);
    if (taps.current.length >= 3) {
      navigate('/admin-login');
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/app');
    } catch {
      toast.error('Login failed');
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={onSubmit} className="bg-surface p-8 rounded-lg w-full max-w-md space-y-4">
        <div ref={logoRef} onClick={onLogoClick} className="flex justify-center mb-6 cursor-pointer">
          <i className="fas fa-lock text-primary text-6xl"></i>
        </div>
        <h2 className="text-2xl text-white text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        <button type="submit" className="w-full bg-primary py-2 rounded text-white">
          Login
        </button>
        <p className="text-center text-gray-400">
          Don’t have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}