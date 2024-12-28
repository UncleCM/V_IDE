export interface LanguageVersions {
    [key: string]: string;
  }
  
  export interface CodeSnippets {
    [key: string]: string;
  }
  
  export interface ExecuteCodeRequest {
    language: string;
    version: string;
    files: {
      content: string;
    }[];
  }
  
  export interface ExecuteCodeResponse {
    run: {
      output: string;
      stderr: string;
    };
  }