import axios from 'axios';
import { logger } from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${AUTH_TOKEN}`,
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

export interface Lab {
  id: number;
  title: string;
  topic: string;
  questions: number;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  description?: string;
  course_id: number;
  start_date?: string;
  end_date?: string;
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

export const getCoursesByYear = async (year: string): Promise<Course[]> => {
  logger.apiCall('getCoursesByYear');
  try {
    const response = await API.get<Course[]>('/api/courses/subject/');
    const courses = response.data.filter(course => 
      course.year_course === year && 
      course.program === "Software Engineering"
    );
    return logger.apiSuccess('getCoursesByYear', courses);
  } catch (error) {
    const errorMessage = logger.apiError('getCoursesByYear', error);
    throw new Error(errorMessage);
  }
};

export const getLabsByCourseId = async (subjectId: string): Promise<Lab[]> => {
  logger.apiCall('getLabsByCourseId');
  try {
    const response = await API.get<Lab[]>(`/api/coding/labtest/${subjectId}`);
    return logger.apiSuccess('getLabsByCourseId', response.data);
  } catch (error) {
    const errorMessage = logger.apiError('getLabsByCourseId', error);
    throw new Error(errorMessage);
  }
};

export const getCourseById = async (courseId: string): Promise<Course> => {
  logger.apiCall('getCourseById');
  try {
    const courses = await getCourses();
    const course = courses.find(c => c.id === parseInt(courseId));
    if (!course) {
      throw new Error('Course not found');
    }
    return logger.apiSuccess('getCourseById', course);
  } catch (error) {
    const errorMessage = logger.apiError('getCourseById', error);
    throw new Error(errorMessage);
  }
};