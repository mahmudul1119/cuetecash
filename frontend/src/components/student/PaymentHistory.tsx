import React from 'react';
import { Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Payment } from '../../types';

interface PaymentHistoryProps {
  studentId: string;
  payments?: Payment[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ studentId, payments }) => {
  const studentPayments = (payments || []).filter(p => p.studentId === studentId);

  const getApprovalStatus = (payment: Payment) => {
    if (payment.paymentType === 'Late Fine') {
      return { status: 'N/A', color: 'text-gray-500', icon: null };
    }

    if (payment.paymentType === 'Semester Fee') {
      if (payment.semesterApprovalStatus === 'Approved') {
        return { status: 'Dept Approved', color: 'text-green-600', icon: CheckCircle };
      } else {
        return { status: 'Pending Dept.', color: 'text-yellow-600', icon: Clock };
      }
    }

    if (payment.paymentType === 'Hall Fee') {
      if (payment.hallApprovalStatus === 'Approved') {
        return { status: 'Hall Approved', color: 'text-green-600', icon: CheckCircle };
      } else {
        return { status: 'Pending Hall', color: 'text-yellow-600', icon: Clock };
      }
    }

    return { status: 'Unknown', color: 'text-gray-500', icon: AlertCircle };
  };

  const getLastPayment = () => {
    if (studentPayments.length === 0) return null;
    
    const lastDate = studentPayments.reduce((latest, payment) => {
      return payment.date > latest ? payment.date : latest;
    }, studentPayments[0].date);
    
    const lastPayments = studentPayments.filter(p => p.date === lastDate);
    const totalAmount = lastPayments.reduce((sum, p) => sum + p.amount, 0);
    
    return { date: lastDate, amount: totalAmount };
  };

  const lastPayment = getLastPayment();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment History</h2>
      
      {studentPayments.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No payments found</p>
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
                  
                  return (
                    <tr key={payment.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="py-3 px-2 text-sm text-gray-900">{payment.date}</td>
                      <td className="py-3 px-2 text-sm text-gray-900">{payment.paymentType}</td>
                      <td className="py-3 px-2 text-sm font-medium text-gray-900">৳{payment.amount.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-gray-600 font-mono">{payment.transactionId}</td>
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