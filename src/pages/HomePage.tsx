// src/pages/HomePage.tsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import CourseItem from "../components/CourseItem";
import CategoryFilter from "../components/CategoryFilter";

function HomePage() {
  const { courses, loading } = useContext(CourseContext);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate(); // ใช้ useNavigate

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  ); // ใช้กับกรณีที่มีข้อมูลซ้ำกัน

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  return (
    <div className="container mx-auto p-4">
            <button
        onClick={() => navigate(-1)} // ย้อนกลับไปยังหน้าก่อนหน้า
        className="bg-indigo-600 text-white px-4 py-2 rounded-full mb-4 hover:bg-indigo-500"
      >
        <i className="fa-solid fa-arrow-left"></i> ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4">คอร์สทั้งหมด</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
