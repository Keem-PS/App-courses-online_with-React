// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import { ProgressProvider } from './context/ProgressContext';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import LecturePage from './pages/LecturePage';
import GetStartedPage from './pages/GetStartedPage';

const App: React.FC = () => {
  return (
    <CourseProvider>
      <ProgressProvider>
          <Routes>
            <Route path="/" element={<GetStartedPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/courses/:courseId/lectures/:lectureId" element={<LecturePage />} />
          </Routes>
      </ProgressProvider>
    </CourseProvider>
  );
};

export default App;
