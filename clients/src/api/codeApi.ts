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
  version?: number;
  score?: number;
}

export interface CodeExecutionResponse {
  id: number;
  code: string;
  language: string;
  output: string | null;
  error: string | null;
  executed_at: string;
  question_id: number;
  version?: number;
  score: number;
}

export const submitCode = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  const response = await API.post<CodeExecutionResponse>('/api/exercises/submittions/', data);
  return response.data;
};

export const saveCode = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  return submitCode(data);
};

export const getNextVersionNumber = async (questionId: number): Promise<number> => {
  const executions = await getQuestionExecutions(questionId);
  
  let maxVersion = 0;
  executions.forEach(execution => {
    if (execution.version) {
      maxVersion = Math.max(maxVersion, execution.version);
    }
  });
  
  return maxVersion + 1;
};

export const saveCodeAs = async (data: CodeSubmission): Promise<CodeExecutionResponse> => {
  const nextVersion = await getNextVersionNumber(data.question_id);
  
  return submitCode({
    ...data,
    version: nextVersion
  });
};

export const setExecutionScore = async (executionId: number, score: number): Promise<CodeExecutionResponse> => {
  const response = await API.patch<CodeExecutionResponse>(`/executions/${executionId}/score/`, { score });
  return response.data;
};

export const getQuestionExecutions = async (questionId: number): Promise<CodeExecutionResponse[]> => {
  const response = await API.get<CodeExecutionResponse[]>(`/executions/by_question/?question_id=${questionId}`);
  return response.data;
};