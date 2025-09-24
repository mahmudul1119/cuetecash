import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Payment } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface PaymentHistoryProps {
  studentId?: string;
  payments?: Payment[];
}

interface PaymentHistoryDTO {
  transactionId: string;
  transactionDate: string;
  dueType: string;
  amount: number;
  paymentMethod: string;
  status: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ studentId, payments }) => {
  const { user } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPaymentHistory();
  }, [user?.email]);

  const fetchPaymentHistory = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5454/api/student/payment-history?email=${encodeURIComponent(user.email)}`);
      
      if (response.ok) {
        const history = await response.json();
        console.log('Payment history loaded:', history);
        setPaymentHistory(history);
      } else {
        throw new Error('Failed to fetch payment history');
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setError('Failed to load payment history');
      setPaymentHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // Use either fetched payment history or passed payments (fallback to mock data)
  const studentPayments = paymentHistory.length > 0 
    ? paymentHistory 
    : (payments || []).filter(p => p.studentId === studentId);

  const getApprovalStatus = (payment: Payment | PaymentHistoryDTO) => {
    // For PaymentHistoryDTO, status is already provided
    if ('status' in payment) {
      return { 
        status: payment.status, 
        color: payment.status === 'Success' ? 'text-green-600' : 'text-yellow-600', 
        icon: payment.status === 'Success' ? CheckCircle : Clock 
      };
    }

    // For Payment objects (legacy)
    const paymentObj = payment as Payment;
    if (paymentObj.paymentType === 'Late Fine') {
      return { status: 'N/A', color: 'text-gray-500', icon: null };
    }

    if (paymentObj.paymentType === 'Semester Fee') {
      if (paymentObj.semesterApprovalStatus === 'Approved') {
        return { status: 'Dept Approved', color: 'text-green-600', icon: CheckCircle };
      } else {
        return { status: 'Pending Dept.', color: 'text-yellow-600', icon: Clock };
      }
    }

    if (paymentObj.paymentType === 'Hall Fee') {
      if (paymentObj.hallApprovalStatus === 'Approved') {
        return { status: 'Hall Approved', color: 'text-green-600', icon: CheckCircle };
      } else {
        return { status: 'Pending Hall', color: 'text-yellow-600', icon: Clock };
      }
    }

    return { status: 'Unknown', color: 'text-gray-500', icon: AlertCircle };
  };

  const getLastPayment = () => {
    if (studentPayments.length === 0) return null;
    
    const getDate = (payment: Payment | PaymentHistoryDTO) => {
      return 'transactionDate' in payment ? payment.transactionDate : payment.date;
    };
    
    const lastDate = studentPayments.reduce((latest, payment) => {
      const currentDate = getDate(payment);
      return currentDate > latest ? currentDate : latest;
    }, getDate(studentPayments[0]));
    
    const lastPayments = studentPayments.filter(p => getDate(p) === lastDate);
    const totalAmount = lastPayments.reduce((sum, p) => sum + p.amount, 0);
    
    return { date: lastDate, amount: totalAmount };
  };

  const lastPayment = getLastPayment();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment History</h2>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading payment history...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchPaymentHistory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      ) : studentPayments.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No approved payments found</p>
          <p className="text-sm text-gray-400 mt-2">Payments will appear here once approved by admin</p>
        </div>
      ) : (
        <>
          {/* Payment Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">TxID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Method</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {studentPayments.map((payment, index) => {
                  const approval = getApprovalStatus(payment);
                  const StatusIcon = approval.icon;
                  
                  // Helper functions to get values from either Payment or PaymentHistoryDTO
                  const getId = (p: Payment | PaymentHistoryDTO) => {
                    return 'transactionId' in p ? p.transactionId : (p as Payment).id;
                  };
                  
                  const getDate = (p: Payment | PaymentHistoryDTO) => {
                    return 'transactionDate' in p ? p.transactionDate : (p as Payment).date;
                  };
                  
                  const getType = (p: Payment | PaymentHistoryDTO) => {
                    return 'dueType' in p ? p.dueType : (p as Payment).paymentType;
                  };
                  
                  const getTransactionId = (p: Payment | PaymentHistoryDTO) => {
                    return 'transactionId' in p ? p.transactionId : (p as Payment).transactionId;
                  };

                  return (
                    <tr key={getId(payment)} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="py-3 px-2 text-sm text-gray-900">{getDate(payment)}</td>
                      <td className="py-3 px-2 text-sm text-gray-900">{getType(payment)}</td>
                      <td className="py-3 px-2 text-sm font-medium text-gray-900">৳{payment.amount.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-gray-600 font-mono">{getTransactionId(payment)}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{payment.paymentMethod}</td>
                      <td className="py-3 px-2">
                        <div className={`flex items-center space-x-1 text-sm ${approval.color}`}>
                          {StatusIcon && <StatusIcon className="w-4 h-4" />}
                          <span>{approval.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {lastPayment && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last Payment: <span className="font-medium text-gray-900">৳{lastPayment.amount.toLocaleString()}</span> on <span className="font-medium text-gray-900">{lastPayment.date}</span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;