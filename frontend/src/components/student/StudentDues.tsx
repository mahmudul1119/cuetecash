import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Building, Book, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { feeService, HallFee, SemesterFee } from '../../services/feeService';
import { useAuth } from '../../contexts/AuthContext';
import QuickPaymentModal from './QuickPaymentModal';

const StudentDues: React.FC = () => {
  const { user } = useAuth();
  const [semesterFees, setSemesterFees] = useState<SemesterFee[]>([]);
  const [hallFees, setHallFees] = useState<HallFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    id: string;
    type: 'semester' | 'hall';
    amount: number;
    title: string;
    semester?: string;
    batch?: string;
  } | null>(null);
  
  // State to track paid fees
  const [paidFees, setPaidFees] = useState<{semesterFees: Set<string>, hallFees: Set<string>}>({
    semesterFees: new Set(),
    hallFees: new Set()
  });

  useEffect(() => {
    fetchAllFees();
    fetchApprovedPayments();
  }, []);

  const fetchAllFees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('User:', user);
      console.log('Fetching all active fees...');

      if (!user) {
        console.log('No user data available - user not logged in');
        setError('Please log in to view your fees.');
        setLoading(false);
        return;
      }

      try {
        // Fetch ALL semester fees
        console.log('Fetching all semester fees...');
        const semesterFeesData = await feeService.getAllSemesterFees();
        console.log('Semester fees data:', semesterFeesData);
        setSemesterFees(semesterFeesData || []);
      } catch (semError) {
        console.error('Error fetching semester fees:', semError);
        setSemesterFees([]);
      }

      try {
        // Fetch ALL hall fees
        console.log('Fetching all hall fees...');
        const hallFeesData = await feeService.getAllHallFees();
        console.log('Hall fees data:', hallFeesData);
        setHallFees(hallFeesData || []);
      } catch (hallError) {
        console.error('Error fetching hall fees:', hallError);
        setHallFees([]);
      }

    } catch (error) {
      console.error('Error in fetchAllFees:', error);
      setError('Failed to load fee information. Please try again later.');
      setSemesterFees([]);
      setHallFees([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const semesterTotal = semesterFees.reduce((sum, fee) => {
      const baseFee = Number(fee.semesterFee || 0);
      const lateFine = isOverdue(fee.deadline) ? Number(fee.lateFine || 0) : 0;
      return sum + baseFee + lateFine;
    }, 0);
    
    const hallTotal = hallFees.reduce((sum, fee) => {
      const baseFee = Number(fee.hFee || 0);
      const lateFine = isOverdue(fee.deadline) ? Number(fee.lateFine || 0) : 0;
      return sum + baseFee + lateFine;
    }, 0);
    
    return semesterTotal + hallTotal;
  };

  // Payment handler functions
  const handlePaymentClick = (fee: SemesterFee | HallFee, type: 'semester' | 'hall') => {
    if (type === 'semester') {
      const semesterFee = fee as SemesterFee;
      const baseFee = Number(semesterFee.semesterFee || 0);
      const lateFine = isOverdue(semesterFee.deadline) ? Number(semesterFee.lateFine || 0) : 0;
      const totalAmount = baseFee + lateFine;
      
      setSelectedPayment({
        id: semesterFee.id?.toString() || '',
        type: 'semester',
        amount: totalAmount,
        title: `${semesterFee.department} - Semester ${semesterFee.semesterID}`,
        semester: semesterFee.semesterID.toString(),
        batch: semesterFee.batchNO.toString()
      });
    } else {
      const hallFee = fee as HallFee;
      const baseFee = Number(hallFee.hFee || 0);
      const lateFine = isOverdue(hallFee.deadline) ? Number(hallFee.lateFine || 0) : 0;
      const totalAmount = baseFee + lateFine;
      
      setSelectedPayment({
        id: hallFee.id?.toString() || '',
        type: 'hall',
        amount: totalAmount,
        title: `${hallFee.hallName} - Hall Fee`,
        semester: hallFee.semesterID.toString(),
        batch: hallFee.batchNO.toString()
      });
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    // Refresh the fees and approved payments after successful payment
    fetchAllFees();
    fetchApprovedPayments();
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const calculateSemesterFeeAmount = (fee: SemesterFee) => {
    const baseFee = Number(fee.semesterFee || 0);
    const lateFine = isOverdue(fee.deadline) ? Number(fee.lateFine || 0) : 0;
    return baseFee + lateFine;
  };

  const calculateHallFeeAmount = (fee: HallFee) => {
    const baseFee = Number(fee.hFee || 0);
    const lateFine = isOverdue(fee.deadline) ? Number(fee.lateFine || 0) : 0;
    return baseFee + lateFine;
  };

  // Check if a fee has an approved payment
  const fetchApprovedPayments = async () => {
    if (!user?.email) return;
    
    try {
      console.log('Checking for approved payments for user:', user.email);
      const response = await fetch(`http://localhost:5454/api/student/${encodeURIComponent(user.email)}/approved-payments`);
      
      if (response.ok) {
        const approvedPayments = await response.json();
        console.log('Approved payments:', approvedPayments);
        
        const semesterPaid = new Set<string>();
        const hallPaid = new Set<string>();
        
        approvedPayments.forEach((payment: any) => {
          console.log('Processing payment:', payment);
          
          // Check for semester fee payment
          if (payment.semesterFee) {
            // Try different possible ID properties
            const semesterFeeId = payment.semesterFee.semesterFeeID || payment.semesterFee.id;
            if (semesterFeeId) {
              console.log('Adding semester fee to paid list:', semesterFeeId);
              semesterPaid.add(semesterFeeId.toString());
            }
          }
          
          // Check for hall fee payment
          if (payment.hallFee) {
            // Try different possible ID properties
            const hallFeeId = payment.hallFee.hallFeeID || payment.hallFee.id;
            if (hallFeeId) {
              console.log('Adding hall fee to paid list:', hallFeeId);
              hallPaid.add(hallFeeId.toString());
            }
          }
        });
        
        setPaidFees({ semesterFees: semesterPaid, hallFees: hallPaid });
      }
    } catch (error) {
      console.error('Error fetching approved payments:', error);
    }
  };

  const isFeePaid = (feeId: string, type: 'semester' | 'hall') => {
    console.log(`Checking if ${type} fee ${feeId} is paid. Paid fees:`, paidFees);
    if (type === 'semester') {
      return paidFees.semesterFees.has(feeId);
    } else {
      return paidFees.hallFees.has(feeId);
    }
  };

  const isOverdue = (deadline: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading fee information...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button 
            onClick={fetchAllFees}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalDues = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Debug Info (remove in production) */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Debug Info:</strong> User: {user?.email}, 
            Semester Fees: {semesterFees.length}, Hall Fees: {hallFees.length}, 
            Total: ৳{totalDues}
          </p>
        </div>
      )}

      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">All Published Fee Structure</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Book className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-600">Total Semester Fees</p>
                <p className="text-lg font-bold text-blue-900">
                  ৳{semesterFees.reduce((sum, fee) => sum + calculateSemesterFeeAmount(fee), 0).toLocaleString()}
                </p>
                <p className="text-xs text-blue-600">{semesterFees.length} fee structures</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Building className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">Total Hall Fees</p>
                <p className="text-lg font-bold text-green-900">
                  ৳{hallFees.reduce((sum, fee) => sum + calculateHallFeeAmount(fee), 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-600">{hallFees.length} fee structures</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-orange-600">Grand Total</p>
                <p className="text-lg font-bold text-orange-900">৳{totalDues.toLocaleString()}</p>
                <p className="text-xs text-orange-600">All active fees</p>
              </div>
            </div>
          </div>
        </div>

        {totalDues === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No active fee structures!</h3>
            <p className="text-gray-600">There are currently no active fee structures published by the administration.</p>
          </div>
        )}
      </div>

      {/* Detailed Fee Breakdown */}
      {(semesterFees.length > 0 || hallFees.length > 0) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Fee Structures</h3>
          
          <div className="space-y-4">
            {/* Semester Fees */}
            {semesterFees
              .filter(fee => {
                const feeId = fee.id?.toString() || '';
                const isPaid = isFeePaid(feeId, 'semester');
                console.log(`Semester fee ${feeId} isPaid: ${isPaid}`);
                return !isPaid;
              })
              .map((fee) => (
              <div key={fee.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Book className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Semester {fee.semesterID} Fee - {fee.department}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Batch {fee.batchNO} | Posted by: {fee.postedBy}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">৳{calculateSemesterFeeAmount(fee).toLocaleString()}</p>
                    {isOverdue(fee.deadline) && Number(fee.lateFine || 0) > 0 && (
                      <p className="text-sm text-red-600">
                        (Base: ৳{Number(fee.semesterFee || 0).toLocaleString()} + Late Fine: ৳{Number(fee.lateFine || 0).toLocaleString()})
                      </p>
                    )}
                    <div className="flex items-center space-x-2 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className={isOverdue(fee.deadline) ? 'text-red-600' : 'text-gray-600'}>
                        Due: {fee.deadline ? new Date(fee.deadline).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePaymentClick(fee, 'semester')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Hall Fees */}
            {hallFees
              .filter(fee => {
                const feeId = fee.id?.toString() || '';
                const isPaid = isFeePaid(feeId, 'hall');
                console.log(`Hall fee ${feeId} isPaid: ${isPaid}`);
                return !isPaid;
              })
              .map((fee) => (
              <div key={fee.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Hall Fee - Semester {fee.semesterID}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {fee.hallName || 'Hall'} | Batch {fee.batchNO}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">৳{calculateHallFeeAmount(fee).toLocaleString()}</p>
                    {isOverdue(fee.deadline) && Number(fee.lateFine || 0) > 0 && (
                      <p className="text-sm text-red-600">
                        (Base: ৳{Number(fee.hFee || 0).toLocaleString()} + Late Fine: ৳{Number(fee.lateFine || 0).toLocaleString()})
                      </p>
                    )}
                    <div className="flex items-center space-x-2 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className={isOverdue(fee.deadline) ? 'text-red-600' : 'text-gray-600'}>
                        Due: {fee.deadline ? new Date(fee.deadline).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePaymentClick(fee, 'hall')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No fees message */}
      {semesterFees.length === 0 && hallFees.length === 0 && !loading && !error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No fee structures available</h3>
            <p className="text-gray-600">
              The administration has not published any active fee structures yet. 
              Please check back later or contact the administration for more information.
            </p>
          </div>
        </div>
      )}
      
      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <QuickPaymentModal
          isOpen={showPaymentModal}
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
          feeDetails={selectedPayment}
          studentId={user?.id || ''}
        />
      )}
    </div>
  );
};

export default StudentDues; 