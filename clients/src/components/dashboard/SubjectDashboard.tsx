import React, { useState, useEffect } from 'react';
import { Box, Grid, Text, VStack, HStack, Badge, Flex, Spinner, useToast, Button } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { GraduationCap, Globe, BookType, Cpu, Brain, ExternalLink, Beaker } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import { getCoursesByYear, getLabsByCourseId, type Course } from '../../api/courseApi';

// Define keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  const navigate = useNavigate();
  const toast = useToast();
  const [loadingLabId, setLoadingLabId] = useState<number | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

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

  const handleLabSelect = async (courseId: number) => {
    setLoadingLabId(courseId);
    try {
      const labs = await getLabsByCourseId(courseId.toString());
      if (labs.length === 0) {
        toast({
          title: "No Labs Available",
          description: "No labs have been assigned for this course yet",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      navigate(`/LabSelection/${courseId}`);
    } catch (error) {
      toast({
        title: "Error Loading Labs",
        description: "Failed to load lab information",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingLabId(null);
    }
  };


  const handleLabScores = (courseId: number) => {
    navigate(`LabScore/`); 
  };

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
      {courses.map((course, index) => (
        <Box
          key={course.id}
          bg="brand.bg.secondary"
          borderRadius="xl"
          border="1px"
          borderColor="brand.border.light"
          overflow="hidden"
          position="relative"
          onMouseEnter={() => setHoveredCourse(course.id)}
          onMouseLeave={() => setHoveredCourse(null)}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          transform={hoveredCourse === course.id ? "translateY(-4px)" : "none"}
          animation={`${fadeIn} 0.6s ease-out ${index * 0.1}s both`}
          _hover={{
            boxShadow: "0 4px 20px -1px rgba(128, 90, 213, 0.2)",
            borderColor: "brand.accent.primary",
          }}
        >
          <Box 
            p={6}
            transition="all 0.3s ease"
            bg={hoveredCourse === course.id ? "brand.bg.hover" : "brand.bg.secondary"}
          >
            <HStack spacing={4} mb={4}>
              <Box
                p={3}
                bg="brand.bg.primary"
                borderRadius="lg"
                color="brand.accent.primary"
                transform={hoveredCourse === course.id ? "scale(1.1)" : "scale(1)"}
                transition="transform 0.3s ease"
              >
                {getTrackIcon(course.track)}
              </Box>
              <VStack align="start" spacing={1}>
                <Text 
                  fontWeight="bold" 
                  color="brand.text.primary" 
                  noOfLines={2}
                  transform={hoveredCourse === course.id ? "translateX(8px)" : "translateX(0)"}
                  transition="transform 0.3s ease"
                >
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

            {/* Hover Actions */}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              bg="brand.bg.hover"
              p={4}
              transform={hoveredCourse === course.id ? "translateY(0)" : "translateY(100%)"}
              opacity={hoveredCourse === course.id ? 1 : 0}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              borderTop="1px"
              borderColor="brand.border.light"
            >
              <HStack spacing={4} justify="space-between">
                <Button
                  leftIcon={<ExternalLink size={16} />}
                  size="sm"
                  variant="outline"
                  onClick={() => handleLabScores(course.id)}
                  transform={hoveredCourse === course.id ? "translateX(0)" : "translateX(-20px)"}
                  opacity={hoveredCourse === course.id ? 1 : 0}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    bg: "brand.bg.primary",
                    transform: "translateX(0) scale(1.05)",
                  }}
                >
                  view Labs Scores
                </Button>
                <Button
                  leftIcon={<Beaker size={16} />}
                  size="sm"
                  colorScheme="purple"
                  onClick={() => handleLabSelect(course.id)}
                  transform={hoveredCourse === course.id ? "translateX(0)" : "translateX(20px)"}
                  opacity={hoveredCourse === course.id ? 1 : 0}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    transform: "translateX(0) scale(1.05)",
                  }}
                >
                  Labs Selection
                </Button>
              </HStack>
            </Box>
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
        const data = await getCoursesByYear(`${selectedYear} Year`);
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
      <ProfileHeader 
        name="John Doe"
        role="Computer Science"
        avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      
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