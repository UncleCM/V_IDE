import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants.ts";
import type { ExecuteCodeRequest, ExecuteCodeResponse } from "./types";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export async function executeCode(language: string, sourceCode: string): Promise<ExecuteCodeResponse> {
  const request: ExecuteCodeRequest = {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  };
  
  const response = await API.post<ExecuteCodeResponse>("/execute", request);
  return response.data;
}