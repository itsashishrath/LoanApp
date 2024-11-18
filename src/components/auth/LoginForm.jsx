import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, user } = useAuth(); // Access user to handle redirect
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before each attempt
    setIsLoggingIn(true); // Set loading state

    const success = await login(email, password);

    if (!success) {
      setError('Invalid email or password. Please try again.');
      setIsLoggingIn(false); // Reset loading state
    }
  };

  // Redirect based on user role
  if (user) {
    if (user.is_admin) {
      return <Navigate to="/admin" replace />; // Redirect to admin dashboard
    } else {
      return <Navigate to="/dashboard" replace />; // Redirect to normal dashboard
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
        disabled={isLoggingIn} // Disable button while logging in
      >
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
