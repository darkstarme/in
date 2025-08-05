import React, { useEffect } from 'react';
import {
  Routes, Route, Navigate, useNavigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Signup from './components/Signup';
import Verify from './components/Verify';
import Login from './components/Login';
import SetupPattern from './components/SetupPattern';
import PatternLockScreen from './components/PatternLockScreen';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import { usePatternLock } from './hooks/usePatternLock';

function Private({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminOnly({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user?.tier === 'admin' ? children : <Navigate to="/app" />;
}

function AppRoutes() {
  const { pattern } = usePatternLock();
  const nav = useNavigate();

  useEffect(() => {
    // after login & verify, if no pattern, redirect to /setup-pattern
  }, []);

  return (
    <>
      {pattern && <PatternLockScreen onUnlock={() => nav('/app')} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup-pattern" element={<SetupPattern />} />
        <Route path="/app" element={<Private><UserDashboard/></Private>} />
        <Route path="/admin/*" element={<Private><AdminOnly><AdminDashboard/></AdminOnly></Private>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}