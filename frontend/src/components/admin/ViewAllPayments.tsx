import React, { useState, useEffect } from 'react';
import { CreditCard, Search, Filter, Download, CheckCircle, Clock, Check, X } from 'lucide-react';
import { mockPayments, mockStudents } from '../../data/mockData';
import { Payment } from '../../types';

interface PaymentResponse {
  paymentID: number;
  transactionID: string;
  paymentMethod: string;
  amount: number;
  date: string;
  paymentStatus: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  student: {
    studentID: number;
    user: {
      name: string;
      email: string;
    };
    rollNumber: string;
    batch: string;
    hallName: string;
  };
  semesterFee?: {
    semesterFeeID: number;
    amount: number;
    lateFineAmount: number;
  };
  hallFee?: {
    hallFeeID: number;
    amount: number;
    lateFineAmount: number;
  };
}

const ViewAllPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterHall, setFilterHall] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [realPayments, setRealPayments] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch pending payments from API
  const fetchPendingPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5454/api/admin/payments/pending');
      if (response.ok) {
        const payments = await response.json();
        setRealPayments(payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Approve payment
  const approvePayment = async (paymentId: number) => {
    try {
      const response = await fetch(`http://localhost:5454/api/admin/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Refresh the payments list
        fetchPendingPayments();
        alert('Payment approved successfully!');
      } else {
        alert('Error approving payment');
      }
    } catch (error) {
      console.error('Error approving payment:', error);
      alert('Error approving payment');
    }
  };

  // Reject payment
  const rejectPayment = async (paymentId: number) => {
    try {
      const response = await fetch(`http://localhost:5454/api/admin/payments/${paymentId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Refresh the payments list
        fetchPendingPayments();
        alert('Payment rejected successfully!');
      } else {
        alert('Error rejecting payment');
      }
    } catch (error) {
      console.error('Error rejecting payment:', error);
      alert('Error rejecting payment');
    }
  };

  // Load payments on component mount
  useEffect(() => {
    fetchPendingPayments();
  }, []);

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
    // Use real payments if available, otherwise fall back to mock data
    const paymentsToFilter = realPayments.length > 0 ? realPayments : mockPayments;
    
    if (realPayments.length > 0) {
      // Filter real payments
      return realPayments.filter(payment => {
        const matchesSearch = !searchTerm || 
          payment.student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.transactionID.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesBatch = !filterBatch || payment.student.batch === filterBatch;
        const matchesHall = !filterHall || payment.student.hallName === filterHall;
        const matchesStatus = !filterStatus || payment.paymentStatus.toLowerCase().includes(filterStatus.toLowerCase());

        return matchesSearch && matchesBatch && matchesHall && matchesStatus;
      });
    } else {
      // Filter mock payments (fallback)
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
    }
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
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => {
              // Check if this is a PaymentResponse (real payment) or Payment (mock)
              const isRealPayment = 'paymentID' in payment;
              
              if (isRealPayment) {
                // Handle real payment from API
                const realPayment = payment as PaymentResponse;
                const status = realPayment.paymentStatus;
                const paymentType = realPayment.semesterFee ? 'Semester Fee' : 
                                   realPayment.hallFee ? 'Hall Fee' : 'Fee Payment';
                
                return (
                  <tr key={`real-${realPayment.paymentID}`} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{realPayment.paymentID}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{realPayment.student.rollNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{realPayment.student.user.name}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">৳{realPayment.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{realPayment.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{paymentType}</td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center space-x-1 text-sm ${
                        status === 'PENDING' ? 'text-yellow-600' :
                        status === 'APPROVED' ? 'text-green-600' :
                        status === 'COMPLETED' ? 'text-green-600' :
                        'text-red-600'
                      }`}>
                        {status === 'PENDING' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        <span>{status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 font-mono">{realPayment.transactionID}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{realPayment.paymentMethod}</td>
                    <td className="py-3 px-4">
                      {status === 'PENDING' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => approvePayment(realPayment.paymentID)}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => rejectPayment(realPayment.paymentID)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              } else {
                // Handle mock payment (fallback)
                const mockPayment = payment as Payment;
                const student = getStudentInfo(mockPayment.studentId);
                const status = getPaymentStatus(mockPayment);
                const StatusIcon = status.icon;

                if (!student) return null;

                return (
                  <tr key={`mock-${mockPayment.id}`} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{mockPayment.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{student.rollNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{student.fullName}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">৳{mockPayment.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{mockPayment.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{mockPayment.paymentType}</td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center space-x-1 text-sm ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span>{status.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 font-mono">{mockPayment.transactionId}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{mockPayment.paymentMethod}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">N/A</td>
                  </tr>
                );
              }
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