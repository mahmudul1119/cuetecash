import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Check, AlertCircle, Download } from 'lucide-react';
import { Student } from '../../types';
import { mockPayments } from '../../data/mockData';

interface PaymentModalProps {
  studentData: Student;
  dues: {
    semesterFee: number;
    hallFee: number;
    lateFine: number;
    totalDue: number;
    remaining: number;
  };
  onClose: () => void;
}

type PaymentStep = 'selection' | 'details' | 'confirmation';
type PaymentType = 'semester' | 'hall' | 'both';
type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'card';

const PaymentModal: React.FC<PaymentModalProps> = ({ studentData, dues, onClose }) => {
  const [step, setStep] = useState<PaymentStep>('selection');
  const [paymentType, setPaymentType] = useState<PaymentType>('both');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [paymentDetails, setPaymentDetails] = useState({
    mobileNo: '',
    amount: dues.remaining,
    transactionId: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentTypeChange = (type: PaymentType) => {
    setPaymentType(type);
    let amount = 0;
    switch (type) {
      case 'semester':
        amount = dues.semesterFee + (dues.lateFine / 2);
        break;
      case 'hall':
        amount = dues.hallFee + (dues.lateFine / 2);
        break;
      case 'both':
        amount = dues.remaining;
        break;
    }
    setPaymentDetails(prev => ({ ...prev, amount }));
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate transaction ID
    const transactionId = `TXN${Date.now()}`;
    
    // Create payment records
    const newPayments = [];
    
    if (paymentType === 'semester' || paymentType === 'both') {
      newPayments.push({
        id: `P${Date.now()}_1`,
        studentId: studentData.id,
        transactionId,
        paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
        amount: dues.semesterFee,
        date: new Date().toISOString().split('T')[0],
        receiptUrl: '#',
        paymentType: 'Semester Fee' as const,
        semesterApprovalStatus: 'Pending' as const,
        hallApprovalStatus: 'Approved' as const
      });
    }
    
    if (paymentType === 'hall' || paymentType === 'both') {
      newPayments.push({
        id: `P${Date.now()}_2`,
        studentId: studentData.id,
        transactionId,
        paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
        amount: dues.hallFee,
        date: new Date().toISOString().split('T')[0],
        receiptUrl: '#',
        paymentType: 'Hall Fee' as const,
        semesterApprovalStatus: 'Approved' as const,
        hallApprovalStatus: 'Pending' as const
      });
    }
    
    if (dues.lateFine > 0) {
      newPayments.push({
        id: `P${Date.now()}_3`,
        studentId: studentData.id,
        transactionId,
        paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
        amount: dues.lateFine,
        date: new Date().toISOString().split('T')[0],
        receiptUrl: '#',
        paymentType: 'Late Fine' as const,
        semesterApprovalStatus: 'Approved' as const,
        hallApprovalStatus: 'Approved' as const
      });
    }
    
    // Add to mock data
    mockPayments.push(...newPayments);
    
    setPaymentDetails(prev => ({ ...prev, transactionId }));
    setPaymentSuccess(true);
    setIsProcessing(false);
    setStep('confirmation');
  };

  const renderStepSelection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Fees & Payment Method</h3>
        
        {/* Dues Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Dues Summary:</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Semester:</span>
              <span>৳{dues.semesterFee.toLocaleString()}</span>
            </div>
            {studentData.hallName && (
              <div className="flex justify-between">
                <span>Hall:</span>
                <span>৳{dues.hallFee.toLocaleString()}</span>
              </div>
            )}
            {dues.lateFine > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Late Fine:</span>
                <span>৳{dues.lateFine.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Type Selection */}
        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-gray-900">Select to Pay:</h4>
          <div className="space-y-2">
            {[
              { key: 'semester', label: 'Semester Only', amount: dues.semesterFee + (dues.lateFine / 2) },
              ...(studentData.hallName ? [{ key: 'hall', label: 'Hall Only', amount: dues.hallFee + (dues.lateFine / 2) }] : []),
              { key: 'both', label: 'Both', amount: dues.remaining }
            ].map(({ key, label, amount }) => (
              <label key={key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentType"
                  value={key}
                  checked={paymentType === key}
                  onChange={(e) => handlePaymentTypeChange(e.target.value as PaymentType)}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex-1 flex justify-between">
                  <span className="text-gray-900">{label}</span>
                  <span className="font-medium text-gray-900">৳{amount.toLocaleString()}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Payment Method:</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'bkash', label: 'bKash', icon: Smartphone, color: 'bg-pink-500' },
              { key: 'nagad', label: 'Nagad', icon: Smartphone, color: 'bg-orange-500' },
              { key: 'rocket', label: 'Rocket', icon: Smartphone, color: 'bg-purple-500' },
              { key: 'card', label: 'Card', icon: CreditCard, color: 'bg-blue-500' }
            ].map(({ key, label, icon: Icon, color }) => (
              <label key={key} className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={key}
                  checked={paymentMethod === key}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="sr-only"
                />
                <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepDetails = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Payment Information</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Payment Method: {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>
              <p className="text-sm text-blue-700">Amount: ৳{paymentDetails.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {paymentMethod !== 'card' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={paymentDetails.mobileNo}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, mobileNo: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
          )}

          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="text"
              value={`৳ ${paymentDetails.amount.toLocaleString()}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepConfirmation = () => (
    <div className="space-y-6 text-center">
      {paymentSuccess ? (
        <>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Transaction ID:</span> {paymentDetails.transactionId}</p>
              <p><span className="font-medium">Amount Paid:</span> ৳{paymentDetails.amount.toLocaleString()}</p>
              <p><span className="font-medium">Payment Method:</span> {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-yellow-800">Payment Under Review</p>
                <p className="text-sm text-yellow-700">Your payment is being processed and will be approved by the respective officers soon.</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Payment Failed</h3>
            <p className="text-gray-600">There was an issue processing your payment. Please try again.</p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'selection' && 'Payment Setup'}
            {step === 'details' && 'Payment Details'}
            {step === 'confirmation' && 'Payment Status'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'selection' && renderStepSelection()}
          {step === 'details' && renderStepDetails()}
          {step === 'confirmation' && renderStepConfirmation()}
        </div>

        {/* Footer */}
        {step !== 'confirmation' && (
          <div className="flex space-x-4 p-6 border-t border-gray-200">
            {step === 'details' && (
              <button
                onClick={() => setStep('selection')}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              onClick={() => {
                if (step === 'selection') {
                  setStep('details');
                } else if (step === 'details') {
                  handleProcessPayment();
                }
              }}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {step === 'selection' && 'Proceed to Payment'}
              {step === 'details' && (isProcessing ? 'Processing...' : 'Verify Payment')}
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;