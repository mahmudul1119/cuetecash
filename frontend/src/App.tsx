import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import StudentDashboard from './components/student/StudentDashboard';
import OfficerDashboard from './components/officer/OfficerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

type AuthPage = 'login' | 'signup' | 'forgot-password';

const AppContent: React.FC = () => {
  const { user, studentData, officerData } = useAuth();
  const [currentAuthPage, setCurrentAuthPage] = useState<AuthPage>('login');

  // If user is logged in, show appropriate dashboard
  if (user) {
    switch (user.role) {
      case 'Student':
        return <StudentDashboard />;
      case 'Hall Officer':
      case 'Dept. Officer':
        return <OfficerDashboard />;
      case 'Admin':
        return <AdminDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  }

  // If user is not logged in, show authentication pages
  switch (currentAuthPage) {
    case 'login':
      return <LoginPage onNavigate={setCurrentAuthPage} />;
    case 'signup':
      return <SignupPage onNavigate={setCurrentAuthPage} />;
    case 'forgot-password':
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Forgot Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registered Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Send Reset Link
              </button>
              <button
                onClick={() => setCurrentAuthPage('login')}
                className="w-full text-gray-600 hover:text-gray-800 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return <LoginPage onNavigate={setCurrentAuthPage} />;
  }
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;