// src/pages/CoursePage.tsx
import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { ProgressContext } from "../context/ProgressContext";

function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, loading } = useContext(CourseContext);
  const { isLectureCompleted } = useContext(ProgressContext);
  const navigate = useNavigate(); // ใช้ useNavigate

  if (loading || courses.length === 0) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  const course = courses.find((c) => c.id.toString() === courseId);

  if (!course || !Array.isArray(course.lecture)) {
    return <div>ไม่พบคอร์สที่คุณต้องการหรือไม่มีบทเรียน</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate(-1)} // ย้อนกลับไปยังหน้าก่อนหน้า
        className="bg-indigo-600 text-white px-4 py-2 rounded-full mb-4 hover:bg-indigo-500">
        <i className="fa-solid fa-arrow-left"></i> ย้อนกลับ
      </button>
      <div className="h-52 shadow-lg sm:h-96">
      <img src={course.img} alt="" className="w-full h-full rounded-lg"/>
      </div>
      <div className="border shadow-lg p-4 mt-4">
      <h1 className="mt-4 text-2xl font-bold mb-2 sm:text-left">
        {course.name}
      </h1>
      <p className="mb-4 sm:text-left">{course.description}</p>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2 text-center sm:text-left">
        รายการบทเรียน
      </h2>

      <div className="list-disc ">
        {course.lecture.map((lecture) => {

          const completed = isLectureCompleted(course.id, lecture.id);

          return (
            <div key={lecture.id} className="flex items-center mt-2">
              <Link
                to={`/courses/${course.id}/lectures/${lecture.id}`}
                className="text-white hover:underline bg-indigo-600 p-4 w-full font-semibold rounded-full"> 
                {completed && (
                <span className="text-xl text-green-500">
                  <i className="fa-solid fa-circle-check"></i> {/* เครื่องหมายติ๊กถูก */}
                </span>
              )}
                {lecture.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursePage;
