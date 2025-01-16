import axios from 'axios';
import { LANGUAGE_VERSIONS } from '../constants';

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

export interface PistonExecuteRequest {
  language: string;
  version: string;
  files: {
    content: string;
  }[];
}

export interface PistonExecuteResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
}

export const executePistonCode = async (language: string, sourceCode: string): Promise<PistonExecuteResponse> => {
  const request: PistonExecuteRequest = {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }]
  };

  try {
    const response = await API.post<PistonExecuteResponse>('/execute', request);
    return response.data;
  } catch (error) {
    console.error('Piston API Error:', error);
    throw error;
  }
};