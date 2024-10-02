// src/pages/CoursePage.tsx
import { useContext } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import { ProgressContext } from '../context/ProgressContext';

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
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4 hover:bg-gray-300"
      >
        ย้อนกลับ
      </button>
  <h1 className="text-2xl font-bold mb-2 text-center sm:text-left">{course.name}</h1>
  <p className="mb-4 text-center sm:text-left">{course.description}</p>
  <h2 className="text-xl font-semibold mt-4 mb-2 text-center sm:text-left">รายการบทเรียน</h2>
  <ul className="list-disc pl-5 space-y-2">
        {course.lecture.map((lecture) => {
          const completed = isLectureCompleted(course.id, lecture.id);
          return (
            <li key={lecture.id} className="flex items-center">
              <Link
                to={`/courses/${course.id}/lectures/${lecture.id}`}
                className="text-blue-500 hover:underline"
              >
                {lecture.name}
              </Link>
              {completed && (
                <span className="ml-2 text-green-500">
                  &#10003; {/* เครื่องหมายติ๊กถูก */}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoursePage;
