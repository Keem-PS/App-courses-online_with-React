// src/context/ProgressContext.tsx
import React, { createContext, useState, useEffect } from 'react';

interface ProgressContextType {
  progress: { [courseId: string]: { [lectureId: string]: boolean } };
  updateProgress: (courseId: string, lectureId: string) => void;
  isLectureCompleted: (courseId: string, lectureId: string) => boolean;
}

export const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  updateProgress: () => {},
  isLectureCompleted: () => false,
});

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<{ [courseId: string]: { [lectureId: string]: boolean } }>(
    {}
  );

  useEffect(() => {
    const storedProgress = localStorage.getItem('user_progress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  const updateProgress = (courseId: string, lectureId: string) => {
    const courseProgress = progress[courseId] || {};
    const newCourseProgress = { ...courseProgress, [lectureId]: true };
    const newProgress = { ...progress, [courseId]: newCourseProgress };
    setProgress(newProgress);
    localStorage.setItem('user_progress', JSON.stringify(newProgress));
  };

  const isLectureCompleted = (courseId: string, lectureId: string) => {
    return progress[courseId]?.[lectureId] || false;
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, isLectureCompleted }}>
      {children}
    </ProgressContext.Provider>
  );
};
