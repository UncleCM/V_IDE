import axios from 'axios';
import { logger } from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Course {
  id: number;
  name: string;
  program: string;
  subject_id: string;
  subject_credit: string;
  year_course: string;
  semester_course: string;
  track: string | null;
  lecturer: string;
  description: string;
  prerequisite: string;
  link: string;
  content: string;
}

export const getCourses = async (): Promise<Course[]> => {
  logger.apiCall('getCourses');
  try {
    const response = await API.get<Course[]>('/api/courses/subject/');
    return logger.apiSuccess('getCourses', response.data);
  } catch (error) {
    const errorMessage = logger.apiError('getCourses', error);
    throw new Error(errorMessage);
  }
};

export const getCoursesByYear = async (year: number): Promise<Course[]> => {
  logger.apiCall('getCoursesByYear');
  try {
    const response = await API.get<Course[]>('/api/courses/subject/');
    const courses = response.data.filter(course => 
      course.year_course === `Year ${year}` && 
      course.program === "Software-Engineering-2024"
    );
    return logger.apiSuccess('getCoursesByYear', courses);
  } catch (error) {
    const errorMessage = logger.apiError('getCoursesByYear', error);
    throw new Error(errorMessage);
  }
};