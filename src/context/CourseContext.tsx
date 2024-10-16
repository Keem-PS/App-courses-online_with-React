// src/context/CourseContext.tsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// กำหนดประเภทสำหรับข้อมูลคอร์ส
export interface LectureType {
  id: string;
  name: string;
  duration: number;
  video: string;
}

export interface CourseType {
  id: string;
  img: string;
  name: string;
  description: string;
  category: string;
  lecture: LectureType[];
}

// ประเภทสำหรับค่าเริ่มต้นของ Context
interface CourseContextType {
  courses: CourseType[];
  loading: boolean;
}

// สร้าง Context
export const CourseContext = createContext<CourseContextType>({
  courses: [],
  loading: true,
});

// สร้าง Provider
export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<CourseType[]>([]); // สถานะสำหรับข้อมูลคอร์ส
  const [loading, setLoading] = useState<boolean>(true); // สถานะสำหรับการโหลดข้อมูล

  // ดึงข้อมูลคอร์สจาก API เมื่อคอมโพเนนต์ถูก mount
  useEffect(() => {
    axios
      .get<CourseType[]>(
        "https://3f055748-27bf-4edf-8c5b-8b5b744e4c16-00-1end2glssicdl.sisko.replit.dev/courses"
      )
      .then((response) => {
        setCourses(response.data); // ตั้งค่าข้อมูลคอร์ส
        setLoading(false); // เปลี่ยนสถานะการโหลดเป็น false
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false); // เปลี่ยนสถานะการโหลดเป็น false เมื่อเกิดข้อผิดพลาด
      });
  }, []); // จะทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์ถูกสร้าง

  return (
    <CourseContext.Provider value={{ courses, loading }}>
      {children} {/* ทำการแสดงผลลูกที่อยู่ภายใน Provider */}
    </CourseContext.Provider>
  );
}
