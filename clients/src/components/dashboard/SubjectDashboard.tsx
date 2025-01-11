import React, { useState, useEffect } from 'react';
import { Box, Grid, Text, VStack, HStack, Badge, Flex, Spinner, useToast } from '@chakra-ui/react';
import { GraduationCap, Globe, BookType, Cpu, Brain } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import { getCoursesByYear, type Course } from '../../api/courseApi';

const tracks = {
  'Artificial Intelligence': <Brain size={20} />,
  'Industrial IoT': <Cpu size={20} />,
  'Metaverse': <Globe size={20} />,
  'Core': <BookType size={20} />
};

const getTrackIcon = (track: string | null) => {
  switch (track) {
    case 'Artificial Intelligence':
      return <Brain size={24} />;
    case 'Industrial IoT':
      return <Cpu size={24} />;
    case 'Metaverse':
      return <Globe size={24} />;
    default:
      return <BookType size={24} />;
  }
};

const getTrackColor = (track: string | null) => {
  const colors = {
    'Artificial Intelligence': 'purple',
    'Industrial IoT': 'blue',
    'Metaverse': 'green',
    'Core': 'gray'
  };
  return colors[track as keyof typeof colors] || 'gray';
};

interface YearSectionProps {
  courses: Course[] | null;
  isLoading: boolean;
}

const YearSection: React.FC<YearSectionProps> = ({ courses, isLoading }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
        <Spinner size="xl" color="brand.accent.primary" />
      </Box>
    );
  }

  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minH="200px"
        color="brand.text.secondary"
      >
        No courses found for this year
      </Box>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
      {courses.map(course => (
        <Box
          key={course.id}
          bg="brand.bg.secondary"
          borderRadius="xl"
          border="1px"
          borderColor="brand.border.light"
          overflow="hidden"
          _hover={{ 
            transform: 'translateY(-2px)',
            transition: 'all 0.2s',
            boxShadow: 'lg'
          }}
          cursor="pointer"
        >
          <Box p={6}>
            <HStack spacing={4} mb={4}>
              <Box
                p={3}
                bg="brand.bg.primary"
                borderRadius="lg"
                color="brand.accent.primary"
              >
                {getTrackIcon(course.track)}
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" color="brand.text.primary" noOfLines={2}>
                  {course.name}
                </Text>
                <HStack spacing={2}>
                  <Badge colorScheme="purple" variant="subtle">
                    {course.subject_id}
                  </Badge>
                  <Badge colorScheme="green" variant="subtle">
                    {course.subject_credit}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="brand.text.secondary">
                  {course.lecturer.trim() || 'TBA'}
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={2}>
              <Badge 
                colorScheme={getTrackColor(course.track)}
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack spacing={2}>
                  {tracks[course.track as keyof typeof tracks] || tracks['Core']}
                  <Text>{course.track || 'Core'}</Text>
                </HStack>
              </Badge>
              <Badge 
                colorScheme="blue" 
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
              >
                {course.semester_course}
              </Badge>
            </HStack>

            {course.description !== '-' && (
              <Text 
                mt={4} 
                fontSize="sm" 
                color="brand.text.secondary"
                noOfLines={2}
              >
                {course.description}
              </Text>
            )}
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

const SubjectDashboard = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await getCoursesByYear(selectedYear);
        setCourses(data);
      } catch (error) {
        toast({
          title: 'Error fetching courses',
          description: error instanceof Error ? error.message : 'Failed to load courses',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setCourses(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [selectedYear, toast]);

  return (
    <VStack spacing={6} align="stretch">
      <ProfileHeader />
      
      <Flex>
        <Box
          w="250px"
          bg="brand.bg.secondary"
          borderRadius="lg"
          p={4}
          mr={6}
          h="fit-content"
          position="sticky"
          top="4"
        >
          <VStack spacing={2} align="stretch">
            <Text
              color="brand.text.secondary"
              fontSize="sm"
              fontWeight="medium"
              mb={2}
              px={3}
            >
              ACADEMIC YEAR
            </Text>
            {[1, 2, 3, 4].map(year => (
              <Box
                key={year}
                px={4}
                py={3}
                bg={selectedYear === year ? 'brand.accent.primary' : 'transparent'}
                color={selectedYear === year ? 'white' : 'brand.text.secondary'}
                borderRadius="lg"
                cursor="pointer"
                onClick={() => setSelectedYear(year)}
                _hover={{
                  bg: selectedYear === year ? 'brand.accent.secondary' : 'brand.bg.hover'
                }}
                transition="all 0.2s"
              >
                <HStack spacing={3}>
                  <GraduationCap size={18} />
                  <Text fontWeight="medium">Year {year}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1">
          <YearSection courses={courses} isLoading={isLoading} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default SubjectDashboard;