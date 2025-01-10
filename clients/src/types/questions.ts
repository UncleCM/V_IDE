export interface Question {
  id: number;
  title: string;
  description: string;
  example: string;
  defaultCode: string;
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