import React, { useState } from 'react';
import { Search, User, Building, Hash, Calendar, Phone, Mail, MapPin, CheckCircle, Clock, Download, CreditCard } from 'lucide-react';
import { mockStudents, mockPayments, mockUsers } from '../../data/mockData';
import { Student, Payment } from '../../types';

const SearchStudent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rangeFrom, setRangeFrom] = useState('');
  const [rangeTo, setRangeTo] = useState('');
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let results: Student[] = [];
    
    if (searchTerm) {
      results = mockStudents.filter(student => 
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleRangeSearch = async () => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const fromNum = parseInt(rangeFrom);
    const toNum = parseInt(rangeTo);
    
    let results: Student[] = [];
    
    if (fromNum && toNum) {
      results = mockStudents.filter(student => {
        const rollNum = parseInt(student.rollNumber);
        return rollNum >= fromNum && rollNum <= toNum;
      });
    }
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const getStudentDuesStatus = (student: Student) => {
    const studentPayments = mockPayments.filter(p => p.studentId === student.id);
    const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);
    
    // Simplified calculation - in real app would check against semester fees
    const expectedTotal = 9700; // 8000 + 1200 + 500
    
    return totalPaid >= expectedTotal ? 'Paid' : 'Due';
  };

  const getStudentPayments = (student: Student): Payment[] => {
    return mockPayments.filter(p => p.studentId === student.id);
  };

  const getStudentEmail = (student: Student): string => {
    const user = mockUsers.find(u => u.id === student.userId);
    return user?.email || 'N/A';
  };

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

    return { status: 'Unknown', color: 'text-gray-500', icon: Clock };
  };

  const renderStudentDetail = (student: Student) => {
    const payments = getStudentPayments(student);
    const email = getStudentEmail(student);
    const currentDues = 0; // Simplified - in real app would calculate from fees

    return (
      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Student Details</h3>
          <button
            onClick={() => setSelectedStudent(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{student.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Roll</p>
                <p className="font-medium text-gray-900">{student.rollNumber}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{student.department}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Batch & Semester</p>
                <p className="font-medium text-gray-900">Batch {student.batch}, {student.currentSemester}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Hall</p>
                <p className="font-medium text-gray-900">{student.hallName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium text-gray-900">{student.mobileNo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{student.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Dues */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Current Dues</h4>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-lg font-semibold text-gray-900">৳{currentDues.toLocaleString()}</p>
                <p className="text-sm text-gray-500">All dues cleared</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Payment History</h4>
          {payments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No payments found</p>
          ) : (
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">TxID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Method</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => {
                    const approval = getApprovalStatus(payment);
                    const StatusIcon = approval.icon;
                    
                    return (
                      <tr key={payment.id} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="py-3 px-4 text-sm text-gray-900">{payment.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{payment.paymentType}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">৳{payment.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 font-mono">{payment.transactionId}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{payment.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <div className={`flex items-center space-x-1 text-sm ${approval.color}`}>
                            {StatusIcon && <StatusIcon className="w-4 h-4" />}
                            <span>{approval.status}</span>
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

        {/* Actions */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Dues
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Approve for Exam
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Search Student Details</h2>
      
      {/* Search Forms */}
      <div className="space-y-4 mb-6">
        {/* Single Roll Search */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Roll No or Name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter roll number or name"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchTerm}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Range Search */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Range
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={rangeFrom}
                onChange={(e) => setRangeFrom(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="From"
              />
              <span className="flex items-center text-gray-500">to</span>
              <input
                type="text"
                value={rangeTo}
                onChange={(e) => setRangeTo(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="To"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleRangeSearch}
              disabled={isSearching || !rangeFrom || !rangeTo}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search Range'}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Search Results:</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Roll</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Batch</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Semester</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Dues Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((student, index) => (
                  <tr key={student.id} className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{student.rollNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{student.fullName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.batch}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.currentSemester}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getStudentDuesStatus(student) === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStudentDuesStatus(student)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Student Detail */}
      {selectedStudent && renderStudentDetail(selectedStudent)}

      {/* No Results */}
      {!isSearching && searchResults.length === 0 && (searchTerm || (rangeFrom && rangeTo)) && (
        <div className="text-center py-8">
          <p className="text-gray-500">No students found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SearchStudent;