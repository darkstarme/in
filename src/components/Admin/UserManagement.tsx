import React, { useEffect, useState } from 'react';
import API from '../../api';
import { User } from '../../types';
import { toast } from 'react-toastify';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    try {
      const res = await API.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    }
  }

  async function deleteUser(id: string) {
    if (!confirm('Delete this user?')) return;
    try {
      await API.delete(`/api/admin/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch {
      toast.error('Delete failed');
    }
  }

  useEffect(fetchUsers, []);

  return (
    <div className="space-y-4 text-gray-200">
      <h2 className="text-2xl text-white">User Management</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Email</th>
            <th className="p-2">Tier</th>
            <th className="p-2">Verified</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b border-gray-800">
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.tier}</td>
              <td className="p-2">{u.verified ? 'Yes' : 'No'}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}