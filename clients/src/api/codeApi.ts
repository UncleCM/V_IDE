import axios from 'axios';
import { logger } from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CodeSubmission {
  code: string;
  language: string;
  question_id: number;
  output: string | null;
  version?: number;
  score?: number;
}

export interface CodeExecutionResponse {
  id: number;
  code: string;
  language: string;
  output: string | null;
  executed_at: string;
  question_id: number;
  version?: number;
  score: number;
}

export const submitCode = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  logger.apiCall('submitCode');
  try {
    const response = await API.post<CodeExecutionResponse>('/api/exercises/submittions/', data);
    console.log('✅ Submit Code Response:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = logger.apiError('submitCode', error);
    throw new Error(errorMessage);
  }
};

export const saveCode = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  logger.apiCall('saveCode');
  try {
    return await submitCode(data);
  } catch (error) {
    const errorMessage = logger.apiError('saveCode', error);
    throw new Error(errorMessage);
  }
};

export const getNextVersionNumber = async (questionId: number): Promise<number> => {
  logger.apiCall('getNextVersionNumber');
  try {
    const submissions = await getUserSubmissions(questionId);
    let maxVersion = 0;
    submissions.forEach(submission => {
      if (submission.version) {
        maxVersion = Math.max(maxVersion, submission.version);
      }
    });
    console.log('📝 Next Version Number:', maxVersion + 1);
    return maxVersion + 1;
  } catch (error) {
    const errorMessage = logger.apiError('getNextVersionNumber', error);
    throw new Error(errorMessage);
  }
};

export const saveCodeAs = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  logger.apiCall('saveCodeAs');
  try {
    const nextVersion = await getNextVersionNumber(data.question_id);
    return await submitCode({
      ...data,
      version: nextVersion
    });
  } catch (error) {
    const errorMessage = logger.apiError('saveCodeAs', error);
    throw new Error(errorMessage);
  }
};

export const setExecutionScore = async (ID: number, marking: number): Promise<CodeExecutionResponse> => {
  logger.apiCall('setExecutionScore');
  try {
    const response = await API.patch<CodeExecutionResponse>(`/api/exercises/submittions/${ID}/score/`, { marking });
    console.log('⭐ Score Update Response:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = logger.apiError('setExecutionScore', error);
    throw new Error(errorMessage);
  }
};

export const getUserSubmissions = async (questionId: number): Promise<CodeExecutionResponse[]> => {
  logger.apiCall('getUserSubmissions');
  try {
    const response = await API.get<CodeExecutionResponse[]>(`/api/exercises/submittions/by_question/?question_id=${questionId}`);
    console.log('📚 User Submissions Response:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = logger.apiError('getUserSubmissions', error);
    throw new Error(errorMessage);
  }
};