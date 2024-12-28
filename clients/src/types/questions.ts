export interface Question {
  id: number;
  title: string;
  description: string;
  example: string;
  defaultCode: string;
}

export interface QuestionListProps {
  onSelectQuestion: (code: string) => void;
}