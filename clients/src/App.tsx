import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodingPage from './Pages/CodingPage';
import QuestionCreatorPage from './Pages/QuestionCreatorPage';
import DashboardPage from './Pages/DashboardPage';
import TeacherDashboardPage from './Pages/TeacherDashboardPage';
import LabSelectionPage from './Pages/LabSelectionPage';
import LabScorePage from './Pages/LabScorePage';
import CourseCreatorPage from './Pages/CourseCreatorPage';
import LabCreatorPage from './Pages/LabCreatorPage';
import TeacherLabScorePage from './Pages/TeacherLabScorePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/teacher" element={<TeacherDashboardPage />} />
        <Route path="/student" element={<DashboardPage />} />
        <Route path="/LabSelection/:subjectId" element={<LabSelectionPage />} />
        <Route path="/CodeEditor/:courseId/:labId" element={<CodingPage />} />
        <Route path="/QuestionCreator" element={<QuestionCreatorPage />} />
        <Route path="/LabScore/" element={<LabScorePage />} />
        <Route path="/LabCreator" element={<LabCreatorPage />} />
        <Route path="/CourseCreator" element={<CourseCreatorPage />} />
        <Route path="/TeacherLabScore" element={<TeacherLabScorePage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;