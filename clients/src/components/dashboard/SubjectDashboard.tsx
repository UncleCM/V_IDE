import React, { useState } from 'react';
import { Box, Grid, Text, VStack, HStack, Badge, Flex } from '@chakra-ui/react';
import { Code, GraduationCap, Globe, Database, Shield } from 'lucide-react';
import ProfileHeader from './ProfileHeader';

interface Course {
  id: number;
  name: string;
  subject_id: string;
  subject_credit: number;
  instructor: string;
  track: string;
  year: number;
  icon: React.ReactNode;
}

const tracks = {
  'Programming': <Code size={20} />,
  'Web Development': <Globe size={20} />,
  'Database': <Database size={20} />,
  'Security': <Shield size={20} />
};

const courses: Course[] = [
  {
    id: 1,
    name: "Computer Programming",
    subject_id: "01418113",
    subject_credit: 3,
    instructor: "Dr. Visit",
    track: "Programming",
    year: 1,
    icon: <Code size={24} />,
  },
  {
    id: 2,
    name: "Elementary Systems Programming",
    subject_id: "01418116",
    subject_credit: 3,
    instructor: "Dr. Johnson",
    track: "Programming",
    year: 1,
    icon: <Code size={24} />,
  },
  {
    id: 3,
    name: "Web Programming",
    subject_id: "01418442",
    subject_credit: 3,
    instructor: "Dr. Smith",
    track: "Web Development",
    year: 1,
    icon: <Globe size={24} />,
  },
  {
    id: 4,
    name: "Database Systems",
    subject_id: "01418331",
    subject_credit: 3,
    instructor: "Dr. Visit",
    track: "Database",
    year: 2,
    icon: <Database size={24} />,
  }
];

interface YearSectionProps {
  courses: Course[];
}

const getTrackColor = (track: string) => {
  const colors = {
    'Programming': 'purple',
    'Web Development': 'blue',
    'Database': 'green',
    'Security': 'red'
  };
  return colors[track as keyof typeof colors] || 'gray';
};

const YearSection: React.FC<YearSectionProps> = ({ courses }) => {
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
                {course.icon}
              </Box>
              <VStack align="start" spacing={1}>
                <HStack>
                  <Text fontWeight="bold" color="brand.text.primary">{course.name}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Badge colorScheme="purple" variant="subtle">
                    {course.subject_id}
                  </Badge>
                  <Badge colorScheme="green" variant="subtle">
                    {course.subject_credit} Credits
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="brand.text.secondary">
                  {course.instructor}
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
                  {tracks[course.track as keyof typeof tracks]}
                  <Text>{course.track}</Text>
                </HStack>
              </Badge>
            </HStack>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

const SubjectDashboard = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const yearCourses = courses.filter(course => course.year === selectedYear);

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
          <YearSection courses={yearCourses} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default SubjectDashboard;