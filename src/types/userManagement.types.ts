import {
  TAcademicDepartment,
  TAcademicSemester,
} from './academicManagement.types';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
  _id: string;
};

export type TStudent = {
  id: string;
  name: TName;
  user: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

export type TFaculty = {
  id: string;
  name: TName;
  user: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: TAcademicDepartment;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};
