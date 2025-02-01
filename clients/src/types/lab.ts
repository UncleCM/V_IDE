export type SupportedLanguage = 'Python' | 'C++';

export type ProgrammingConcept = 
  | 'Expression' 
  | 'For Loop' 
  | 'While Loop'
  | 'Function'
  | 'Array'
  | 'String'
  | 'Recursion'
  | 'Object'
  | 'Class'
  | 'Variable'
  | 'Conditional'
  | 'Loop';

export interface Lab {
  id: number;
  name: string;
  number: string;
  language: SupportedLanguage;
  duration: {
    hours: string;
    minutes: string;
  };
  tags: string[];
  tutorial: string;
}

export interface LabStatus {
  status: 'not-started' | 'in-progress' | 'completed';
  lastModified?: string;
}

export interface LabWithStatus extends Lab {
  status: LabStatus['status'];
}   