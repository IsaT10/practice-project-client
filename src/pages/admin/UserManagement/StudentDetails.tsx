import React from 'react';
import { useParams } from 'react-router-dom';

export default function StudentDetails() {
  const { studentId } = useParams();

  console.log(studentId);
  return <div>StudentDetails {studentId}</div>;
}
