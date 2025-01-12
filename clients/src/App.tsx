import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodingPage from './Pages/CodingPage';
import QuestionCreatorPage from './Pages/QuestionCreator';
import DashboardPage from './Pages/DashboardPage';
import TeacherDashboardPage from './Pages/TeacherDashboardPage';
import LabSelectionPage from './Pages/LabSelectionPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/teacher" element={<TeacherDashboardPage />} />
        <Route path="/student" element={<DashboardPage />} />
        <Route path="/LabSelection" element={<LabSelectionPage />} />
        <Route path="/CodeEditor" element={<CodingPage />} />
        <Route path="/QuestionCreator" element={<QuestionCreatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;