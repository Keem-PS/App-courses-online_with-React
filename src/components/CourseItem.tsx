import { CourseType } from '../context/CourseContext';
import { Link } from 'react-router-dom';

interface CourseItemProps {
  course: CourseType;
}

function CourseItem({ course }: CourseItemProps) {
  return (
    <div className="border p-4 rounded shadow flex flex-col">
      <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
      <p className="flex-grow">{course.description}</p>
      <p className="text-sm text-gray-500 mt-2">หมวดหมู่: {course.category}</p>
      <p className="text-sm text-gray-500">จำนวนบทเรียน: {course.lecture.length}</p>
      <Link
        to={`/courses/${course.id}`}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
      >
        ดูรายละเอียดคอร์ส
      </Link>
    </div>
  );
}


export default CourseItem;
