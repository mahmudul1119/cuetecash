const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5454/api' : '/api';

export interface SemesterFee {
  id: number;
  semesterID: number;
  batchNO: number;
  department: string;
  semesterFee: number;
  deadline: string;
  lateFine: string;
  postedBy: string;
  isActive: boolean;
}

export interface HallFee {
  id: number;
  semesterID: number;
  batchNO: number;
  hallId: number;
  hallName: string;
  hFee: string;
  deadline: string;
  lateFine: string;
  isActive: boolean;
}

export const feeService = {
  // Get all active semester fees
  getAllSemesterFees: async (): Promise<SemesterFee[]> => {
    const response = await fetch(`${API_BASE_URL}/semester-fees`);
    if (!response.ok) {
      throw new Error('Failed to fetch semester fees');
    }
    return response.json();
  },

  // Get all active hall fees
  getAllHallFees: async (): Promise<HallFee[]> => {
    const response = await fetch(`${API_BASE_URL}/hall-fees`);
    if (!response.ok) {
      throw new Error('Failed to fetch hall fees');
    }
    return response.json();
  },

  // Create new semester fee
  createSemesterFee: async (semesterFee: Omit<SemesterFee, 'id' | 'postedBy' | 'isActive'>): Promise<SemesterFee> => {
    const response = await fetch(`${API_BASE_URL}/semester-fees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(semesterFee),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create semester fee');
    }
    
    return response.json();
  },

  // Create new hall fee
  createHallFee: async (hallFee: Omit<HallFee, 'id' | 'hallName' | 'isActive'>): Promise<HallFee> => {
    const response = await fetch(`${API_BASE_URL}/hall-fees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hallFee),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create hall fee');
    }
    
    return response.json();
  },

  // Update semester fee
  updateSemesterFee: async (id: number, semesterFee: Partial<SemesterFee>): Promise<SemesterFee> => {
    const response = await fetch(`${API_BASE_URL}/semester-fees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(semesterFee),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update semester fee');
    }
    
    return response.json();
  },

  // Update hall fee
  updateHallFee: async (id: number, hallFee: Partial<HallFee>): Promise<HallFee> => {
    const response = await fetch(`${API_BASE_URL}/hall-fees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hallFee),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update hall fee');
    }
    
    return response.json();
  },

  // Delete semester fee
  deleteSemesterFee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/semester-fees/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete semester fee');
    }
  },

  // Delete hall fee
  deleteHallFee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/hall-fees/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete hall fee');
    }
  },
}; 
