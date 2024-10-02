// src/context/CourseContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface LectureType {
  id: string;
  name: string;
  duration: number;
  video: string;
}

export interface CourseType {
  id: string;
  name: string;
  description: string;
  category: string;
  lecture: LectureType[];
}

interface CourseContextType {
  courses: CourseType[];
  loading: boolean;
}

export const CourseContext = createContext<CourseContextType>({
  courses: [],
  loading: true,
});

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<CourseType[]>('https://0b7b17fc-4d0a-4afc-b7b5-1402498475b8-00-lk44mlusknce.sisko.replit.dev/courses')
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading }}>
      {children}
    </CourseContext.Provider>
  );
};
