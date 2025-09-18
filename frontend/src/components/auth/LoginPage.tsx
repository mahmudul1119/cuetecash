import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('mahmudul@cuet.edu');
  const [password, setPassword] = useState('123123');
  const [role, setRole] = useState<UserRole>('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const success = await login(email, password, role);
      if (!success) {
        setError('Invalid credentials. Please check email/password/role.');
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLoginOptions = [
    { email: 'mahmudul@cuet.edu', password: '123123', role: 'Student' as UserRole, label: 'Student Demo' },
    { email: 'hall.officer@cuet.edu', password: '123123', role: 'Hall Officer' as UserRole, label: 'Hall Officer Demo' },
    { email: 'dept.officer@cuet.edu', password: '123123', role: 'Dept. Officer' as UserRole, label: 'Dept Officer Demo' },
    { email: 'admin@cuet.edu', password: '123123', role: 'Admin' as UserRole, label: 'Admin Demo' }
  ];

  const handleQuickLogin = (option: typeof quickLoginOptions[0]) => {
    setEmail(option.email);
    setPassword(option.password);
    setRole(option.role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CUET eCash</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Quick Login Demo Options */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-3">Quick Demo Login:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickLoginOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuickLogin(option)}
                className="text-xs px-3 py-2 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['Student', 'Hall Officer', 'Dept. Officer', 'Admin'] as UserRole[]).map((roleOption) => (
                <label key={roleOption} className="relative">
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={role === roleOption}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="sr-only"
                  />
                  <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    role === roleOption
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}>
                    <div className="text-center">
                      <div className={`w-6 h-6 mx-auto mb-1 rounded-full ${
                        role === roleOption ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">{roleOption}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Additional Links */}
          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-gray-600 hover:text-gray-800"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;