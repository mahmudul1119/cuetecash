import { User, Student, Officer, Payment, Semester, HallFee, Notice } from '../types';

export const mockUsers: User[] = [
  {
    id: 'U1',
    email: 'mahmudul@cuet.edu',
    password: 'password123',
    role: 'Student'
  },
  {
    id: 'U2',
    email: 'jane@cuet.edu',
    password: 'password123',
    role: 'Student'
  },
  {
    id: 'U3',
    email: 'halloffice@cuet.edu',
    password: 'password123',
    role: 'Hall Officer'
  },
  {
    id: 'U4',
    email: 'deptoffice@cuet.edu',
    password: 'password123',
    role: 'Dept. Officer'
  },
  {
    id: 'U5',
    email: 'admin@cuetecash.edu.bd',
    password: 'admin123',
    role: 'Admin'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'S1',
    userId: 'U1',
    fullName: 'Mahmudul Islam',
    rollNumber: '2204027',
    department: 'CSE',
    batch: '22',
    currentSemester: '8th Semester (4th Year)',
    mobileNo: '01XXXXXXXXX',
    address: 'Ramu, Cox\'s Bazar',
    hallName: 'Shaheed Hall'
  },
  {
    id: 'S2',
    userId: 'U2',
    fullName: 'Jane Doe',
    rollNumber: '2203055',
    department: 'EEE',
    batch: '22',
    currentSemester: '7th Semester (4th Year)',
    mobileNo: '01YYYYYYYYY',
    address: 'Dhaka, Bangladesh',
    hallName: 'Shaheed Hall'
  }
];

export const mockOfficers: Officer[] = [
  {
    id: 'O1',
    userId: 'U3',
    fullName: 'Engr. A.K. Azad',
    designation: 'Assistant Provost',
    department: 'Civil Engineering'
  },
  {
    id: 'O2',
    userId: 'U4',
    fullName: 'Dr. Rahman Ahmed',
    designation: 'Associate Professor',
    department: 'Computer Science'
  },
  {
    id: 'O3',
    userId: 'U5',
    fullName: 'Md. Rezaul Karim',
    designation: 'System Administrator',
    department: 'Administration'
  }
];

export let mockPayments: Payment[] = [
  {
    id: 'P1',
    studentId: 'S1',
    transactionId: 'TXN67890',
    paymentMethod: 'Nagad',
    amount: 8000,
    date: '2025-07-09',
    receiptUrl: '#',
    paymentType: 'Semester Fee',
    semesterApprovalStatus: 'Pending',
    hallApprovalStatus: 'Approved'
  },
  {
    id: 'P2',
    studentId: 'S1',
    transactionId: 'TXN67890',
    paymentMethod: 'Nagad',
    amount: 1200,
    date: '2025-07-09',
    receiptUrl: '#',
    paymentType: 'Hall Fee',
    semesterApprovalStatus: 'Approved',
    hallApprovalStatus: 'Pending'
  },
  {
    id: 'P3',
    studentId: 'S1',
    transactionId: 'TXN67890',
    paymentMethod: 'Nagad',
    amount: 500,
    date: '2025-07-09',
    receiptUrl: '#',
    paymentType: 'Late Fine',
    semesterApprovalStatus: 'Approved',
    hallApprovalStatus: 'Approved'
  }
];

export const mockSemesters: Semester[] = [
  {
    id: 'SEM1',
    batchNo: '22',
    semesterId: '8',
    department: 'CSE',
    semesterFee: 8000,
    lateFine: 500,
    deadline: '2025-07-10'
  },
  {
    id: 'SEM2',
    batchNo: '22',
    semesterId: '7',
    department: 'EEE',
    semesterFee: 8000,
    lateFine: 500,
    deadline: '2025-07-10'
  }
];

export const mockHallFees: HallFee[] = [
  {
    id: 'HF1',
    hallName: 'Shaheed Hall',
    batch: '22',
    semester: '8',
    fee: 1200,
    lateFine: 200,
    deadline: '2025-07-10'
  },
  {
    id: 'HF2',
    hallName: 'Shaheed Hall',
    batch: '22',
    semester: '7',
    fee: 1200,
    lateFine: 200,
    deadline: '2025-07-10'
  }
];

export let mockNotices: Notice[] = [
  {
    id: 'N1',
    postedAt: '2025-07-09',
    noticeType: 'Fee',
    title: 'Fee deadline extended',
    content: 'Students of Batch 22, Sem 8 must clear dues by 10th July 2025. Late fine will apply.',
    postedBy: 'Admin'
  },
  {
    id: 'N2',
    postedAt: '2025-06-15',
    noticeType: 'Exam',
    title: 'Exam clearance requirements',
    content: 'Exam clearance begins after full payment and hall fee submission.',
    postedBy: 'Admin'
  }
];

export const hallOptions = [
  'Shaheed Hall',
  'Bangabandhu Hall',
  'Kazi Nazrul Islam Hall',
  'Shaheed Salam Barkat Hall'
];

export const departmentOptions = [
  'CSE',
  'EEE',
  'Civil Engineering',
  'Mechanical Engineering',
  'Naval Architecture',
  'Architecture',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Economics'
];