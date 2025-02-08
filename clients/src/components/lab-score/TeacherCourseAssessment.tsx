import React, { useState } from 'react';
import { FileSpreadsheet, X } from 'lucide-react';

interface Student {
  no: number;
  id: string;
  name: string;
  labScores: {
    [key: string]: number;
  };
}

interface GradingCriteria {
  min: number;
  max: number;
  grade: string;
}

interface TeacherCourseAssessmentProps {
  selectedLab: string;
  students: Student[];
}

const TeacherCourseAssessment = ({ selectedLab }: TeacherCourseAssessmentProps) => {
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [gradingCriteria, setGradingCriteria] = useState<GradingCriteria[]>([
    { min: 80, max: 100, grade: 'A' },
    { min: 70, max: 79, grade: 'B+' },
    { min: 60, max: 69, grade: 'B' },
  ]);
  const [editingCriteria, setEditingCriteria] = useState<GradingCriteria[]>([]);

  const mockStudents = [
    {
      no: 1,
      id: "6411234",
      name: "John Doe",
      labScores: {
        lab1: 85,
        lab2: 90,
        lab3: 88,
        lab14: 92
      }
    },
    {
      no: 2,
      id: "6411235",
      name: "Jane Smith",
      labScores: {
        lab1: 92,
        lab2: 88,
        lab3: 95,
        lab14: 90
      }
    },
    {
      no: 3,
      id: "6411236",
      name: "Bob Johnson",
      labScores: {
        lab1: 78,
        lab2: 85,
        lab3: 80,
        lab14: 88
      }
    }
  ];

  const calculateTotal = (scores: { [key: string]: number }) => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const getGrade = (total: number) => {
    const average = total / 4; // Assuming 4 labs
    for (const criteria of gradingCriteria) {
      if (average >= criteria.min && average <= criteria.max) {
        return criteria.grade;
      }
    }
    return 'F';
  };

  const openGradingModal = () => {
    setEditingCriteria([...gradingCriteria]);
    setIsGradingModalOpen(true);
  };

  const handleCriteriaSave = () => {
    setGradingCriteria([...editingCriteria]);
    setIsGradingModalOpen(false);
  };

  const handleCriteriaChange = (index: number, field: keyof GradingCriteria, value: string) => {
    const newCriteria = [...editingCriteria];
    if (field === 'grade') {
      newCriteria[index][field] = value;
    } else {
      newCriteria[index][field] = Number(value);
    }
    setEditingCriteria(newCriteria);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedLab}</h2>
          <h3 className="text-lg text-gray-700">Course Assessment</h3>
        </div>
        <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Export to Excel File
        </button>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lab1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lab2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lab3</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lab14</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.labScores.lab1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.labScores.lab2}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.labScores.lab3}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.labScores.lab14}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {calculateTotal(student.labScores)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {getGrade(calculateTotal(student.labScores))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="bg-yellow-50 rounded-lg p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Min</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Max</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradingCriteria.map((criteria, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-600">{criteria.min}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">&lt; Score &lt;=</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{criteria.max}</td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{criteria.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 justify-start">
          <button 
            onClick={openGradingModal}
            className="w-32 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
          >
            Grading
          </button>
          <button className="w-32 px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors text-sm">
            Export to Excel
          </button>
        </div>
      </div>

      {/* Grading Modal */}
      {isGradingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Grading Criteria</h3>
              <button 
                onClick={() => setIsGradingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {editingCriteria.map((criteria, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Score</label>
                    <input
                      type="number"
                      value={criteria.min}
                      onChange={(e) => handleCriteriaChange(index, 'min', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Score</label>
                    <input
                      type="number"
                      value={criteria.max}
                      onChange={(e) => handleCriteriaChange(index, 'max', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                    <input
                      type="text"
                      value={criteria.grade}
                      onChange={(e) => handleCriteriaChange(index, 'grade', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsGradingModalOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCriteriaSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourseAssessment;