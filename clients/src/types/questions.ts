export type SupportedLanguage = 'Python' | 'Javascript' | 'Typescript' | 'Rust' | 'Cpp';

export interface Question {
  id: number;
  title: string;
  description: string;
  example: string;
  defaultCode: string;
  name: string;
  number: string;
  language: SupportedLanguage;
  duration: {
    hours: string;
    minutes: string;
  };
  tags: string[];
  tutorial: string;
  question: string;
  fullCodeTest: string;
  score: string;
  testCases: TestCase[];
  testData: TestData[];
}

export interface QuestionStatus {
  status: 'not-started' | 'in-progress' | 'completed' | 'error';
  lastAttempt?: string;
}

export interface QuestionWithStatus extends Question {
  status: QuestionStatus['status'];
}

export interface QuestionListProps {
  onSelectQuestion: (question: Question) => void;
}

export interface TestCase {
  id: number;
  description: string;
  score: number;
}

export interface TestData {
  id: number;
  description: string;
  score: number;
}