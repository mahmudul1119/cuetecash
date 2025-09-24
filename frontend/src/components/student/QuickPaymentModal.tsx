import React, { useState } from 'react';
import { X, CreditCard, Check, AlertCircle } from 'lucide-react';

interface QuickPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  feeDetails: {
    id: string;
    type: 'semester' | 'hall';
    amount: number;
    title: string;
    semester?: string;
    batch?: string;
  };
  studentId: string;
}

type PaymentMethod = 'bkash' | 'nagad' | 'rocket';

const QuickPaymentModal: React.FC<QuickPaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  feeDetails,
  studentId
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const paymentMethods = [
    { id: 'bkash' as const, name: 'bKash', icon: '💰', color: 'bg-pink-500' },
    { id: 'nagad' as const, name: 'Nagad', icon: '📱', color: 'bg-orange-500' },
    { id: 'rocket' as const, name: 'Rocket', icon: '🚀', color: 'bg-purple-500' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      setError('Please enter the transaction ID');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const paymentData = {
        studentId,
        dueType: feeDetails.type === 'semester' ? 'Semester Fee' : 'Hall Fee',
        amount: feeDetails.amount,
        transactionId: transactionId.trim(),
        paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
        feeId: feeDetails.id
      };

      const response = await fetch('http://localhost:5454/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onPaymentSuccess();
          handleClose();
        }, 2000);
      } else {
        throw new Error('Payment submission failed');
      }
    } catch (err) {
      setError('Failed to submit payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTransactionId('');
    setError('');
    setSuccess(false);
    setPaymentMethod('bkash');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Make Payment
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          // Success State
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Payment Submitted Successfully!
            </h3>
            <p className="text-sm text-gray-600">
              Your payment has been submitted for verification. You will be notified once it's processed.
            </p>
          </div>
        ) : (
          // Payment Form
          <form onSubmit={handleSubmit} className="p-6">
            {/* Fee Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">{feeDetails.title}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                {feeDetails.semester && (
                  <p>Semester: {feeDetails.semester}</p>
                )}
                {feeDetails.batch && (
                  <p>Batch: {feeDetails.batch}</p>
                )}
                <p className="font-semibold text-lg text-green-600">
                  Amount: ৳{feeDetails.amount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === method.id
                        ? `${method.color} border-transparent text-white`
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl mb-1">{method.icon}</div>
                      <div className="text-xs font-medium">{method.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction ID Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction ID
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the transaction ID you received after making the payment via {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !transactionId.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </span>
                ) : (
                  'Submit Payment'
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Instructions:</strong> Complete the payment via {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} first, then enter the transaction ID here. Your payment will be verified by the administration.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuickPaymentModal;