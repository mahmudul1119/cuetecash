import React, { useState, useEffect } from 'react';
import { Building, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { feeService } from '../../services/feeService';

interface Hall {
  hallID: number;
  hallName: string;
}

const AddHallFee: React.FC = () => {
  const [formData, setFormData] = useState({
    hallId: '',
    batchNO: '',
    semesterID: '',
    hFee: '',
    lateFine: '',
    deadline: ''
  });
  const [halls, setHalls] = useState<Hall[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch halls on component mount
  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await fetch('http://localhost:5454/api/halls', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const hallsData = await response.json();
        setHalls(hallsData);
      } else {
        // Fallback to mock data if API fails
        const mockHalls: Hall[] = [
          { hallID: 1, hallName: 'Bangabandhu Sheikh Mujibur Rahman Hall' },
          { hallID: 2, hallName: 'Shaheed Abdur Rob Hall' },
          { hallID: 3, hallName: 'Pritilata Hall' },
          { hallID: 4, hallName: 'Kazi Nazrul Islam Hall' },
          { hallID: 5, hallName: 'Shah Amanat Hall' }
        ];
        setHalls(mockHalls);
      }
    } catch (error) {
      console.error('Error fetching halls:', error);
      // Fallback to mock data
      const mockHalls: Hall[] = [
        { hallID: 1, hallName: 'Bangabandhu Sheikh Mujibur Rahman Hall' },
        { hallID: 2, hallName: 'Shaheed Abdur Rob Hall' },
        { hallID: 3, hallName: 'Pritilata Hall' },
        { hallID: 4, hallName: 'Kazi Nazrul Islam Hall' },
        { hallID: 5, hallName: 'Shah Amanat Hall' }
      ];
      setHalls(mockHalls);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await feeService.createHallFee({
        hallId: parseInt(formData.hallId),
        batchNO: parseInt(formData.batchNO),
        semesterID: parseInt(formData.semesterID),
        hFee: formData.hFee,
        lateFine: formData.lateFine,
        deadline: formData.deadline
      });
      
      setMessage({ type: 'success', text: 'Hall fee structure created successfully!' });
      setFormData({
        hallId: '',
        batchNO: '',
        semesterID: '',
        hFee: '',
        lateFine: '',
        deadline: ''
      });
    } catch (error) {
      console.error('Error creating hall fee:', error);
      setMessage({ type: 'error', text: 'Failed to create hall fee structure. Please try again.' });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <Building className="w-6 h-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Add Hall Fee Structure</h1>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-medium ${
            message.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {message.text}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hall Name
          </label>
          <select
            name="hallId"
            value={formData.hallId}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Hall</option>
            {halls.map(hall => (
              <option key={hall.hallID} value={hall.hallID}>
                {hall.hallName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch
            </label>
            <select
              name="batchNO"
              value={formData.batchNO}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Batch</option>
              <option value="18">Batch 18</option>
              <option value="19">Batch 19</option>
              <option value="20">Batch 20</option>
              <option value="21">Batch 21</option>
              <option value="22">Batch 22</option>
              <option value="23">Batch 23</option>
              <option value="24">Batch 24</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              name="semesterID"
              value={formData.semesterID}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hall Fee (৳)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="hFee"
                value={formData.hFee}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Late Fine (৳)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="lateFine"
                value={formData.lateFine}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 200"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Deadline
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Save Hall Fee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHallFee;
