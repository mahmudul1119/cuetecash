import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, Student, Officer, UserRole } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [officerData, setOfficerData] = useState<Officer | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadUserData(userData);
    }
  }, []);

  const loadUserData = async (userData: User) => {
    try {
      const res = await fetch(`http://localhost:5454/api/student/profile?email=${encodeURIComponent(userData.email)}`);
      if (res.ok) {
        const profile = await res.json();
        setStudentData({
          id: String(profile.studentID ?? ''),
          userId: String(profile.user?.userID ?? ''),
          fullName: profile.fullName ?? '',
          rollNumber: profile.rollNo ?? '',
          department: profile.department ?? '',
          batch: String(profile.batch ?? ''),
          currentSemester: String(profile.currentSemester ?? ''),
          mobileNo: profile.mobileNO ?? '',
          address: profile.address ?? '',
          hallName: profile.hall?.hallName
        });
      } else {
        setStudentData(null);
      }
    } catch {
      setStudentData(null);
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Map frontend roles to backend roles
      const roleMapping: Record<UserRole, string> = {
        'Student': 'STUDENT',
        'Hall Officer': 'HALL_OFFICER', 
        'Dept. Officer': 'OFFICER',
        'Admin': 'ADMIN'
      };
      
      const backendRole = roleMapping[role];
      
      const res = await fetch('http://localhost:5454/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: backendRole })
      });
      if (!res.ok) return false;
      let data: any;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        try { data = JSON.parse(text); } catch { data = {}; }
      }
      const token: string | undefined = data.token;
      const authedUser: User = { id: data.email || email, email: data.email || email, password: '', role };
      if (token) {
        localStorage.setItem('authToken', token);
      }
      localStorage.setItem('currentUser', JSON.stringify(authedUser));
      setUser(authedUser);
      loadUserData(authedUser);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setStudentData(null);
    setOfficerData(null);
    localStorage.removeItem('currentUser');
  };

  const signup = async (userData: Partial<Student> & { email: string; password: string }): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:5454/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userData.fullName || '',
          rollNumber: userData.rollNumber || '',
          department: userData.department || '',
          batch: Number(userData.batch) || 0,
          currentSemester: Number(userData.currentSemester) || 0,
          mobileNumber: userData.mobileNo || '',
          hallName: userData.hallName || '',
          email: userData.email,
          address: userData.address || '',
          password: userData.password
        })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    studentData,
    officerData,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};