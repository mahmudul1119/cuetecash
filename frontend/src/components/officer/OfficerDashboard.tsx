import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../Layout';
import { Search, CheckCircle, Bell, User, Building, Award } from 'lucide-react';
import SearchStudent from './SearchStudent';
import ApproveExam from './ApproveExam';

type ActivePanel = 'overview' | 'search' | 'approve' | 'notices';

const OfficerDashboard: React.FC = () => {
  const { officerData, user } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>('overview');

  if (!officerData || !user) {
    return <div>Loading...</div>;
  }

  const getPendingApprovalsCount = () => {
    // In a real app, this would come from the database
    return 5;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Officer Information Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{officerData.fullName}</h2>
              <p className="text-gray-600">Officer Dashboard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium text-gray-900">{officerData.designation}</p>
              </div>
            </div>
          </div>

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
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="font-medium text-blue-600">{getPendingApprovalsCount()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setActivePanel('search')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Search Student</h3>
              <p className="text-sm text-gray-600">Find student details</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('approve')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Approve Exam</h3>
              <p className="text-sm text-gray-600">Process approvals</p>
              {getPendingApprovalsCount() > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                  {getPendingApprovalsCount()} pending
                </span>
              )}
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('notices')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Notices</h3>
              <p className="text-sm text-gray-600">View announcements</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderNotices = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Officer Notices</h2>
      
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-blue-600">2025-07-09</span>
          </div>
          <p className="text-gray-800">"Final date for semester fee payment is July 10."</p>
        </div>
        
        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-green-600">2025-06-28</span>
          </div>
          <p className="text-gray-800">"Officer approval required before exam clearance."</p>
        </div>
      </div>
    </div>
  );

  return (
    <Layout title="Officer Dashboard">
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'search', label: 'Search Student', icon: Search },
            { key: 'approve', label: 'Approve Exam', icon: CheckCircle },
            { key: 'notices', label: 'Notices', icon: Bell }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActivePanel(key as ActivePanel)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activePanel === key
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Panel Content */}
        {activePanel === 'overview' && renderOverview()}
        {activePanel === 'search' && <SearchStudent />}
        {activePanel === 'approve' && <ApproveExam officerRole={user.role} />}
        {activePanel === 'notices' && renderNotices()}
      </div>
    </Layout>
  );
};

export default OfficerDashboard;