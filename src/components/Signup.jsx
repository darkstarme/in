import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords must match');
      return;
    }
    try {
      await signup({ email, name, surname, password });
      navigate('/verify');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 p-4">
      <form onSubmit={onSubmit} className="bg-surface p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl text-white text-center">Sign Up</h2>
        {error && <p className="text-red-400">{error}</p>}
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
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        <button type="submit" className="w-full bg-primary py-2 rounded text-white">
          Sign Up
        </button>
        <p className="text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </form>
    </div>
);
}