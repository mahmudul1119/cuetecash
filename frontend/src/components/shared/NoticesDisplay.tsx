import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Tag } from 'lucide-react';
import { noticeService } from '../../services/noticeService';
import { Notice } from '../../types';

interface NoticesDisplayProps {
  title: string;
  userRole?: string;
  limit?: number;
}

const NoticesDisplay: React.FC<NoticesDisplayProps> = ({ 
  title, 
  userRole = 'Student', 
  limit 
}) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      let data = await noticeService.getAllNotices();
      
      // Apply limit if specified
      if (limit && data.length > limit) {
        data = data.slice(0, limit);
      }
      
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setError('Failed to load notices. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getNoticeTypeColor = (type: string) => {
    const colors = {
      'FEE': 'bg-yellow-100 text-yellow-800 border-yellow-500',
      'EXAM': 'bg-red-100 text-red-800 border-red-500',
      'ACADEMIC': 'bg-blue-100 text-blue-800 border-blue-500',
      'GENERAL': 'bg-gray-100 text-gray-800 border-gray-500',
      'HALL': 'bg-green-100 text-green-800 border-green-500',
      'URGENT': 'bg-red-100 text-red-800 border-red-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-500';
  };

  const getRoleBasedBorderColor = (noticeType: string) => {
    // Different border colors based on user role and notice type
    if (userRole === 'Student') {
      return noticeType === 'FEE' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500';
    } else if (userRole.includes('Officer')) {
      return noticeType === 'URGENT' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-purple-500';
    }
    return 'border-l-4 border-l-blue-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading notices...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={fetchNotices}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      
      {notices.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notices available</h3>
          <p className="text-gray-600">Check back later for updates!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div 
              key={notice.id} 
              className={`${getRoleBasedBorderColor(notice.noticeType)} bg-gray-50 p-4 rounded-r-lg hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getNoticeTypeColor(notice.noticeType)}`}>
                    <Tag className="w-3 h-3 inline mr-1" />
                    {notice.noticeType}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{notice.postedAt}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{notice.title}</h3>
              <p className="text-gray-700 leading-relaxed">{notice.content}</p>
              
              <div className="mt-3 text-sm text-gray-500">
                Posted by: <span className="font-medium">{notice.postedBy}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {limit && notices.length > 0 && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => window.location.href = '/notices'}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View All Notices →
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticesDisplay; 