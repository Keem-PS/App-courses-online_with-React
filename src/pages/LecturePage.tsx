// src/pages/LecturePage.tsx
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { ProgressContext } from "../context/ProgressContext";

function LecturePage() {
  const { courseId, lectureId } = useParams<{
    courseId: string;
    lectureId: string;
  }>();
  const { courses, loading } = useContext(CourseContext);
  const { updateProgress, isLectureCompleted } = useContext(ProgressContext);
  const navigate = useNavigate(); // ใช้ useNavigate

  if (loading || courses.length === 0) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  const course = courses.find((c) => c.id.toString() === courseId);
  console.log(course);
  const lecture = course?.lecture.find((l) => l.id.toString() === lectureId);

  if (!course || !lecture) {
    return <div>ไม่พบบทเรียนที่คุณต้องการ</div>;
  }

  const completed = isLectureCompleted(course.id, lecture.id);

  const handleMarkAsComplete = () => {
    updateProgress(course.id, lecture.id);
  };

  return (
    <div className="container mx-auto p-4">
      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={() => navigate(-1)} // ย้อนกลับไปยังหน้าก่อนหน้า
        className="bg-indigo-600 text-white px-4 py-2 rounded-full mb-4 hover:bg-indigo-500"
      >
        <i className="fa-solid fa-arrow-left"></i> ย้อนกลับ
      </button>
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
        {lecture.name}
      </h1>

      <div className=" aspect-video sm:h-96">
        <iframe
          className=" h-full w-full rounded-lg shadow-lg sm:h-96"
          src={lecture.video}
          width="100%"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>

      <button
        onClick={handleMarkAsComplete}
        className={`w-full sm:w-auto px-4 py-2 rounded-full font-semibold mt-4 ${
          completed
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        disabled={completed}
      >
        {completed ? "เรียนแล้ว" : "ทำเครื่องหมายว่าเรียนแล้ว"}
      </button>
    </div>
  );
}

export default LecturePage;
