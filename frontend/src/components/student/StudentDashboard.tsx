import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../Layout';
import { CreditCard, History, Bell, User, MapPin, Phone, Mail, Building, Hash, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import PaymentModal from './PaymentModal';
import PaymentHistory from './PaymentHistory';
import NoticesDisplay from '../shared/NoticesDisplay';
import StudentDues from './StudentDues';
// Removed mock imports; expects real data from future APIs

type ActivePanel = 'overview' | 'dues' | 'payment' | 'history' | 'notices';

const StudentDashboard: React.FC = () => {
  const { studentData, user } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const s = studentData || {
    id: '',
    userId: '',
    fullName: '',
    rollNumber: '',
    department: '',
    batch: '',
    currentSemester: '',
    mobileNo: '',
    address: '',
    hallName: '' as string | undefined
  };

  const getRegistrationStatus = () => {
    return { status: 'pending', text: 'Awaiting approvals', color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' };
  };

  const getCurrentDues = () => {
    return { semesterFee: 0, hallFee: 0, lateFine: 0, totalDue: 0, totalPaid: 0, remaining: 0 };
  };

  const registrationStatus = getRegistrationStatus();
  const dues = getCurrentDues();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Personal Information Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{s.fullName || 'Student'}</h2>
              <p className="text-gray-600">Student Dashboard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="font-medium text-gray-900">{s.rollNumber || '-'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{s.department || '-'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Batch & Semester</p>
                <p className="font-medium text-gray-900">Batch {s.batch || '-'}, {s.currentSemester || '-'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Hall</p>
                <p className="font-medium text-gray-900">{s.hallName || '-'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium text-gray-900">{s.mobileNo || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-900">{s.address || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Status */}
      <div className={`${registrationStatus.bgColor} ${registrationStatus.borderColor} border rounded-2xl p-6`}>
        <div className="flex items-center space-x-3">
          {registrationStatus.status === 'complete' ? (
            <CheckCircle className={`w-6 h-6 ${registrationStatus.color}`} />
          ) : registrationStatus.status === 'partial' ? (
            <Clock className={`w-6 h-6 ${registrationStatus.color}`} />
          ) : (
            <AlertCircle className={`w-6 h-6 ${registrationStatus.color}`} />
          )}
          <div>
            <h3 className={`font-semibold ${registrationStatus.color}`}>Registration Status</h3>
            <p className={`${registrationStatus.color}`}>{registrationStatus.text}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setActivePanel('dues')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">View Dues</h3>
              <p className="text-sm text-gray-600">Check outstanding fees</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActivePanel('history')}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <History className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Payment History</h3>
              <p className="text-sm text-gray-600">View past transactions</p>
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
              <p className="text-sm text-gray-600">Important announcements</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderDues = () => <StudentDues />;

  const renderNotices = () => <NoticesDisplay title="Student Notices" userRole="Student" limit={5} />;

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'dues', label: 'View Dues', icon: CreditCard },
            { key: 'history', label: 'Payment History', icon: History },
            { key: 'notices', label: 'Notices', icon: Bell }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActivePanel(key as ActivePanel)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activePanel === key
                  ? 'bg-white text-blue-600 shadow-sm'
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
        {activePanel === 'dues' && renderDues()}
        {activePanel === 'history' && <PaymentHistory studentId={s.id} payments={[]} />}
        {activePanel === 'notices' && renderNotices()}

        {/* Payment Modal */}
        {showPaymentModal && studentData && (
          <PaymentModal
            studentData={studentData}
            dues={dues}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;