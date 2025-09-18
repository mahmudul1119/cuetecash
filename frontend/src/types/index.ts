export type UserRole = 'Student' | 'Hall Officer' | 'Dept. Officer' | 'Admin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  rollNumber: string;
  department: string;
  batch: string;
  currentSemester: string;
  mobileNo: string;
  address: string;
  hallName?: string;
}

export interface Officer {
  id: string;
  userId: string;
  fullName: string;
  designation: string;
  department: string;
}

export interface Payment {
  id: string;
  studentId: string;
  transactionId: string;
  paymentMethod: string;
  amount: number;
  date: string;
  receiptUrl: string;
  paymentType: 'Semester Fee' | 'Hall Fee' | 'Late Fine';
  semesterApprovalStatus: 'Pending' | 'Approved';
  hallApprovalStatus: 'Pending' | 'Approved';
}

export interface Semester {
  id: string;
  batchNo: string;
  semesterId: string;
  department: string;
  semesterFee: number;
  lateFine: number;
  deadline: string;
}

export interface HallFee {
  id: string;
  hallName: string;
  batch: string;
  semester: string;
  fee: number;
  lateFine: number;
  deadline: string;
}

export interface Notice {
  id: string;
  postedAt: string;
  noticeType: string;
  title: string;
  content: string;
  postedBy: string;
}

export interface AuthContextType {
  user: User | null;
  studentData: Student | null;
  officerData: Officer | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<Student> & { email: string; password: string }) => Promise<boolean>;
}