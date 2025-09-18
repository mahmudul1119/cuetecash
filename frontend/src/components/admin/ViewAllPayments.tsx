import React, { useState } from 'react';
import { CreditCard, Search, Filter, Download, CheckCircle, Clock } from 'lucide-react';
import { mockPayments, mockStudents } from '../../data/mockData';
import { Payment } from '../../types';

const ViewAllPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterHall, setFilterHall] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const getStudentInfo = (studentId: string) => {
    return mockStudents.find(s => s.id === studentId);
  };

  const getPaymentStatus = (payment: Payment) => {
    if (payment.paymentType === 'Late Fine') {
      return { status: 'Approved', color: 'text-green-600', icon: CheckCircle };
    }

    let approvalCount = 0;
    let totalRequired = 0;

    if (payment.paymentType === 'Semester Fee') {
      totalRequired = 1;
      if (payment.semesterApprovalStatus === 'Approved') approvalCount++;
    } else if (payment.paymentType === 'Hall Fee') {
      totalRequired = 1;
      if (payment.hallApprovalStatus === 'Approved') approvalCount++;
    }

    if (approvalCount === totalRequired) {
      return { status: 'Fully Approved', color: 'text-green-600', icon: CheckCircle };
    } else if (approvalCount > 0) {
      return { status: 'Partially Approved', color: 'text-yellow-600', icon: Clock };
    } else {
      if (payment.paymentType === 'Semester Fee') {
        return { status: 'Pending Dept. Approval', color: 'text-red-600', icon: Clock };
      } else {
        return { status: 'Pending Hall Approval', color: 'text-red-600', icon: Clock };
      }
    }
  };

  const getFilteredPayments = () => {
    return mockPayments.filter(payment => {
      const student = getStudentInfo(payment.studentId);
      if (!student) return false;

      const matchesSearch = !searchTerm || 
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBatch = !filterBatch || student.batch === filterBatch;
      const matchesHall = !filterHall || student.hallName === filterHall;

      let matchesStatus = true;
      if (filterStatus) {
        const status = getPaymentStatus(payment);
        matchesStatus = status.status.toLowerCase().includes(filterStatus.toLowerCase());
      }

      return matchesSearch && matchesBatch && matchesHall && matchesStatus;
    });
  };

  const filteredPayments = getFilteredPayments();
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">All Payments History</h2>
            <p className="text-sm text-gray-600">
              Showing {filteredPayments.length} payments • Total: ৳{totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Search by name, roll, or TxID"
          />
        </div>

        <select
          value={filterBatch}
          onChange={(e) => setFilterBatch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">All Batches</option>
          <option value="22">Batch 22</option>
          <option value="23">Batch 23</option>
          <option value="24">Batch 24</option>
        </select>

        <select
          value={filterHall}
          onChange={(e) => setFilterHall(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">All Halls</option>
          <option value="Shaheed Hall">Shaheed Hall</option>
          <option value="Bangabandhu Hall">Bangabandhu Hall</option>
          <option value="Kazi Nazrul Islam Hall">Kazi Nazrul Islam Hall</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="partial">Partially Approved</option>
        </select>

        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Payment ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Roll No</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">TxID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => {
              const student = getStudentInfo(payment.studentId);
              const status = getPaymentStatus(payment);
              const StatusIcon = status.icon;

              if (!student) return null;

              return (
                <tr key={payment.id} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{payment.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{student.rollNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{student.fullName}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">৳{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.paymentType}</td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center space-x-1 text-sm ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{status.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{payment.transactionId}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{payment.paymentMethod}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-8">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No payments found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ViewAllPayments;