import { useState } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Course, SupportedLanguage } from '../types/courses';
import Header from '../components/Layout/Header';
import CourseSidebar from '../components/course/CourseSidebar';
import CourseForm from '../components/course/CourseForm';

const courseService = {
  saveCourse: async (course: Course) => {
    console.log('Saving course:', course);
    return { ...course, id: Date.now() };
  },
  updateCourse: async (course: Course) => {
    console.log('Updating course:', course);
    return course;
  }
};

const CourseCreatorPage = () => {
  const [course, setCourse] = useState<Course>({
    id: 0,
    name: 'Python Programming Lab',
    numberOfClasses: '14',
    languages: ['Python', 'C++'],
    schedule: {
      day: 'Monday',
      fromHours: '16',
      fromMinutes: '30',
      toHours: '19',
      toMinutes: '30',
      room: 'ECC-704'
    },
    lecturerName: '',
    description: 'Tutorial for teaching programming concepts for each lab class.',
    coursePicture: ''
  });

  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleChange = (field: keyof Course['schedule'], value: string) => {
    setCourse(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const handleLanguageAdd = (language: SupportedLanguage) => {
    if (!course.languages.includes(language)) {
      setCourse(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
  };

  const handleLanguageRemove = (language: SupportedLanguage) => {
    setCourse(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  const handleSaveCourse = async () => {
    try {
      const savedCourse = await courseService.saveCourse(course);
      setCourse(savedCourse);
    } catch (error) {
      console.error('Failed to save course:', error);
    }
  };

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="7xl" py={4}>
        <Flex gap={4}>
          <CourseSidebar />
          <CourseForm
            course={course}
            onCourseChange={handleCourseChange}
            onScheduleChange={handleScheduleChange}
            onLanguageAdd={handleLanguageAdd}
            onLanguageRemove={handleLanguageRemove}
            onSave={handleSaveCourse}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default CourseCreatorPage;