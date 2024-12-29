import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CodeSubmission {
  code: string;
  language: string;
  question_id: number;
  output: string | null;
  error: string | null;
}

export interface CodeExecutionResponse {
  id: number;
  code: string;
  language: string;
  output: string | null;
  error: string | null;
  executed_at: string;
  question_id: number;
}

export const submitCode = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  const response = await API.post<CodeExecutionResponse>('/executions/', data);
  return response.data;
};

export const getQuestionExecutions = async (questionId: number): Promise<CodeExecutionResponse[]> => {
  const response = await API.get<CodeExecutionResponse[]>(`/executions/by_question/?question_id=${questionId}`);
  return response.data;
};