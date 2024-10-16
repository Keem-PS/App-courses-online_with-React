// src/context/ProgressContext.tsx
import React, { createContext, useState, useEffect } from "react";

// กำหนดประเภทข้อมูลสำหรับ ProgressContext
interface ProgressContextType {
  progress: { [courseId: string]: { [lectureId: string]: boolean } }; // สถานะของการเรียนแต่ละบทเรียน
  updateProgress: (courseId: string, lectureId: string) => void; // ฟังก์ชันสำหรับอัปเดตความคืบหน้า
  isLectureCompleted: (courseId: string, lectureId: string) => boolean; // ฟังก์ชันสำหรับตรวจสอบสถานะการเรียน
}

// สร้าง Context
export const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  updateProgress: () => {},
  isLectureCompleted: () => false,
});

// สร้าง Provider
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<{
    [courseId: string]: { [lectureId: string]: boolean };
  }>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem("user_progress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // ฟังก์ชันสำหรับอัปเดตความคืบหน้าเมื่อผู้ใช้เรียนบทเรียนเสร็จ
  const updateProgress = (courseId: string, lectureId: string) => {
    const courseProgress = progress[courseId] || {};
    const newCourseProgress = { ...courseProgress, [lectureId]: true };
    const newProgress = { ...progress, [courseId]: newCourseProgress };
    setProgress(newProgress);
    localStorage.setItem("user_progress", JSON.stringify(newProgress));
  };

  const isLectureCompleted = (courseId: string, lectureId: string) => {
    return progress[courseId]?.[lectureId] || false;
  };

  return (
    <ProgressContext.Provider
      value={{ progress, updateProgress, isLectureCompleted }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
