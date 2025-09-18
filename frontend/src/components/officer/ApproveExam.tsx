import React, { useState } from 'react';
import { CheckCircle, Clock, Filter, CreditCard } from 'lucide-react';
import { mockPayments, mockStudents, mockUsers } from '../../data/mockData';
import { Payment, UserRole } from '../../types';

interface ApproveExamProps {
  officerRole: UserRole;
}

const ApproveExam: React.FC<ApproveExamProps> = ({ officerRole }) => {
  const [filterBatch, setFilterBatch] = useState('');
  const [filterSemester, setFilterSemester] = useState('');

  const getFilteredPayments = () => {
    let filteredPayments = mockPayments.filter(payment => {
      // Filter based on officer role
      if (officerRole === 'Hall Officer') {
        return payment.paymentType === 'Hall Fee' && payment.hallApprovalStatus === 'Pending';
      } else if (officerRole === 'Dept. Officer') {
        return payment.paymentType === 'Semester Fee' && payment.semesterApprovalStatus === 'Pending';
      }
      return false;
    });

    // Apply additional filters
    if (filterBatch || filterSemester) {
      filteredPayments = filteredPayments.filter(payment => {
        const student = mockStudents.find(s => s.id === payment.studentId);
        if (!student) return false;
        
        const batchMatch = !filterBatch || student.batch === filterBatch;
        const semesterMatch = !filterSemester || student.currentSemester.includes(filterSemester);
        
        return batchMatch && semesterMatch;
      });
    }

    return filteredPayments;
  };

  const handleApprovePayment = (paymentId: string) => {
    const paymentIndex = mockPayments.findIndex(p => p.id === paymentId);
    if (paymentIndex === -1) return;

    const updatedPayment = { ...mockPayments[paymentIndex] };

    if (officerRole === 'Hall Officer') {
      updatedPayment.hallApprovalStatus = 'Approved';
    } else if (officerRole === 'Dept. Officer') {
      updatedPayment.semesterApprovalStatus = 'Approved';
    }

    mockPayments[paymentIndex] = updatedPayment;
    
    // Force re-render by updating state
    setFilterBatch(filterBatch);
  };

  const getStudentInfo = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student || null;
  };

  const getApprovalButtonText = () => {
    return officerRole === 'Hall Officer' ? 'Approve Hall' : 'Approve Semester';
  };

  const filteredPayments = getFilteredPayments();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Approve Students for Exam ({officerRole})
        </h2>
        <div className="text-sm text-gray-500">
          Showing {officerRole === 'Hall Officer' ? 'Hall Fee' : 'Semester Fee'} payments pending approval
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        <select
          value={filterBatch}
          onChange={(e) => setFilterBatch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Batches</option>
          <option value="22">Batch 22</option>
          <option value="23">Batch 23</option>
          <option value="24">Batch 24</option>
        </select>
        <select
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Semesters</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-gray-500">No pending approvals found</p>
          <p className="text-sm text-gray-400 mt-1">All payments have been processed</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Roll</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Paid Amt</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fine</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Paid Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Payment Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Approval Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => {
                const student = getStudentInfo(payment.studentId);
                if (!student) return null;

                const approvalStatus = officerRole === 'Hall Officer' 
                  ? payment.hallApprovalStatus 
                  : payment.semesterApprovalStatus;

                return (
                  <tr key={payment.id} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{student.rollNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{student.fullName}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">৳{payment.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">৳0</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{payment.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{payment.paymentType}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-600">
                          {approvalStatus === 'Pending' ? `Pending ${officerRole.split(' ')[0]}` : 'Approved'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleApprovePayment(payment.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          {getApprovalButtonText()}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApproveExam;