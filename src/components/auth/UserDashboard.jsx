// UserDashboard.jsx
import React from 'react';
import { useAuth } from '../auth/AuthContext';
// New import 👇
import { useNavigate } from 'react-router-dom';
import { LoanRequestForm } from '../loan/LoanRequestForm';
import { LoanList } from '../loan/LoanList';

export const UserDashboard = () => {
  const { logout } = useAuth();
  // New line 👇
  const navigate = useNavigate();

  // New function 👇
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* New div 👇 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      {/* Everything below remains exactly the same 👇 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <LoanRequestForm />
        </div>
        <div>
          <LoanList />
        </div>
      </div>
    </div>
  );
};