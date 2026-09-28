import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

import {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser,
} from '../api/users';

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'viewer',
  });
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Redirect AFTER hooks
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }


  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await createUser(form);
      setMessage('User created');
      setForm({ name: '', email: '', password: '', role: 'viewer' });
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create user');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this user?')) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to remove user');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Create accounts and assign roles for staff access
          </p>
        </div>

        {/* Create user */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Create user</h2>
          {message && (
            <p className="text-sm mb-3 text-blue-400">{message}</p>
          )}
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="viewer">Viewer</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-sm font-medium"
            >
              Create user
            </button>
          </form>
        </div>

        {/* User list */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Staff accounts</h2>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-700 rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-sm text-slate-400">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="text-xs bg-slate-900 border border-slate-600 rounded px-2 py-1"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="operator">Operator</option>
                      <option value="admin">Admin</option>
                    </select>
                    {u._id !== user._id && (
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Users;
