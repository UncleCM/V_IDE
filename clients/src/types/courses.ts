export type SupportedLanguage = 'Python' | 'C++';

export interface TimeSchedule {
  day: string;
  fromHours: string;
  fromMinutes: string;
  toHours: string;
  toMinutes: string;
  room: string;
}

export interface Course {
  id: number;
  name: string;
  numberOfClasses: string;
  languages: SupportedLanguage[];
  schedule: TimeSchedule;
  lecturerName: string;
  description: string;
  coursePicture?: string;
}

export interface CourseStatus {
  status: 'active' | 'inactive' | 'archived';
  lastModified?: string;
}

export interface CourseWithStatus extends Course {
  status: CourseStatus['status'];
}