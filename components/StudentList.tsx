'use client';

import { useEffect, useState } from 'react';
import StudentCard from './StudentCard';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  enrollment_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentDeleted = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading students...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        {error}
        <button
          onClick={fetchStudents}
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No students found. Add one to get started!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Students ({students.length})</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onDeleted={handleStudentDeleted}
          />
        ))}
      </div>
    </div>
  );
}
