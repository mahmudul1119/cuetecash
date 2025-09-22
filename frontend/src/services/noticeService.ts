import { Notice } from '../types';

const API_BASE_URL = 'http://localhost:5454/api';

export interface CreateNoticeRequest {
  title: string;
  content: string;
  noticeType: string;
}

export const noticeService = {
  // Get all notices
  async getAllNotices(): Promise<Notice[]> {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notices');
    }

    const data = await response.json();
    
    // Transform backend data to frontend format
    return data.map((notice: any) => ({
      id: notice.id.toString(),
      postedAt: notice.postedAt,
      noticeType: notice.noticeType,
      title: notice.title,
      content: notice.content,
      postedBy: notice.postedBy
    }));
  },

  // Get notices by type
  async getNoticesByType(noticeType: string): Promise<Notice[]> {
    const response = await fetch(`${API_BASE_URL}/notices/type/${noticeType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notices by type');
    }

    const data = await response.json();
    
    return data.map((notice: any) => ({
      id: notice.id.toString(),
      postedAt: notice.postedAt,
      noticeType: notice.noticeType,
      title: notice.title,
      content: notice.content,
      postedBy: notice.postedBy
    }));
  },

  // Create a new notice
  async createNotice(noticeData: CreateNoticeRequest): Promise<Notice> {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(noticeData),
    });

    if (!response.ok) {
      throw new Error('Failed to create notice');
    }

    const data = await response.json();
    
    return {
      id: data.id.toString(),
      postedAt: data.postedAt,
      noticeType: data.noticeType,
      title: data.title,
      content: data.content,
      postedBy: data.postedBy
    };
  },

  // Update an existing notice
  async updateNotice(id: string, noticeData: CreateNoticeRequest): Promise<Notice> {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(noticeData),
    });

    if (!response.ok) {
      throw new Error('Failed to update notice');
    }

    const data = await response.json();
    
    return {
      id: data.id.toString(),
      postedAt: data.postedAt,
      noticeType: data.noticeType,
      title: data.title,
      content: data.content,
      postedBy: data.postedBy
    };
  },

  // Delete a notice
  async deleteNotice(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete notice');
    }
  },

  // Get a specific notice by ID
  async getNoticeById(id: string): Promise<Notice> {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notice');
    }

    const data = await response.json();
    
    return {
      id: data.id.toString(),
      postedAt: data.postedAt,
      noticeType: data.noticeType,
      title: data.title,
      content: data.content,
      postedBy: data.postedBy
    };
  }
}; 