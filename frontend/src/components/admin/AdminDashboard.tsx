import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../Layout';
import { Plus, Bell, FileText, CreditCard, Users, User, Building, Calendar, DollarSign, AlertCircle, Clock } from 'lucide-react';
import AddSemesterFee from './AddSemesterFee';
import AddHallFee from './AddHallFee';
import PostNotice from './PostNotice';
import ManageNotices from './ManageNotices';
import ViewAllPayments from './ViewAllPayments';
import ManageUsers from './ManageUsers';

type ActivePanel = 'overview' | 'add-semester' | 'add-hall' | 'post-notice' | 'manage-notices' | 'all-payments' | 'manage-users';

const AdminDashboard: React.FC = () => {
  const { officerData, user } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>('overview');

  // Check if user is authenticated and has admin role
  if (!user || user.role !== 'Admin') {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to access this page.</p>
      </div>
    </div>;
  }

  // Show loading if officer data is still being fetched
  if (!officerData) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    </div>;
  }

  const getSystemStats = () => {
    // In a real app, these would come from API calls
    return {
      totalStudents: 1250,
      totalPayments: 3840,
      pendingApprovals: 15,
      totalRevenue: 12500000
    };
  };

  const stats = getSystemStats();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Admin Information Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{officerData.fullName}</h2>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{officerData.department}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium text-gray-900">{officerData.designation}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalPayments.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Payments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</h3>
              <p className="text-sm text-gray-600">Pending Approvals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">৳{(stats.totalRevenue / 1000000).toFixed(1)}M</h3>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => setActivePanel('add-semester')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add Semester Fees</h3>
              <p className="text-sm text-gray-600">Set fee structure for semesters</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('add-hall')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add Hall Fees</h3>
              <p className="text-sm text-gray-600">Set fee structure for halls</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('post-notice')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <Plus className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Post Notice</h3>
              <p className="text-sm text-gray-600">Create new announcements</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('manage-notices')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Notices</h3>
              <p className="text-sm text-gray-600">Edit or delete notices</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('all-payments')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
              <CreditCard className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View All Payments</h3>
              <p className="text-sm text-gray-600">Monitor payment history</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('manage-users')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">Add officers and manage accounts</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'add-semester', label: 'Add Semester Fees', icon: Calendar },
            { key: 'add-hall', label: 'Add Hall Fees', icon: Building },
            { key: 'post-notice', label: 'Post Notice', icon: Plus },
            { key: 'manage-notices', label: 'Manage Notices', icon: Bell },
            { key: 'all-payments', label: 'View All Payments', icon: CreditCard },
            { key: 'manage-users', label: 'Manage Users', icon: Users }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActivePanel(key as ActivePanel)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                activePanel === key
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Panel Content */}
        {activePanel === 'overview' && renderOverview()}
        {activePanel === 'add-semester' && <AddSemesterFee />}
        {activePanel === 'add-hall' && <AddHallFee />}
        {activePanel === 'post-notice' && <PostNotice />}
        {activePanel === 'manage-notices' && <ManageNotices />}
        {activePanel === 'all-payments' && <ViewAllPayments />}
        {activePanel === 'manage-users' && <ManageUsers />}
      </div>
    </Layout>
  );
};

export default AdminDashboard;