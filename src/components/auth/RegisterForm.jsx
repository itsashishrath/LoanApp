import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirm: '',
  });
  const { register } = useAuth();
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // Flag for redirect
  const [error, setError] = useState(null); // Error state for handling registration errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before each attempt

    const success = await register(
      formData.email,
      formData.username,
      formData.password,
      formData.password_confirm
    );

    if (!success) {
      setError('Registration failed. Please try again.');
    } else {
      // If registration is successful, trigger redirect to dashboard
      setRedirectToDashboard(true);
    }
  };

  if (redirectToDashboard) {
    // After successful registration, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          value={formData.password_confirm}
          onChange={(e) => setFormData((prev) => ({ ...prev, password_confirm: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
};
