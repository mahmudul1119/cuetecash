import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const GenericDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
        </div>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default GenericDashboard;


