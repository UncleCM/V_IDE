import React from 'react';
import { Box, Grid, Heading, Text, VStack, HStack, Badge, Stat, StatLabel, StatNumber, StatGroup, useColorModeValue } from '@chakra-ui/react';
import { Users, BookOpen, Clock, Award, Bell, Calendar } from 'lucide-react';

interface Class {
  id: number;
  name: string;
  students: number;
  Langauge: string;
  averageGrade: number;
  nextAssignment: string;
  submissions: number;
}

const classes: Class[] = [
  {
    id: 1,
    name: "Computer and Programming",
    students: 25,
    Langauge: "Python",
    averageGrade: 87,
    nextAssignment: "Python Functions",
    submissions: 18
  },
  {
    id: 2,
    name: "Elementary System Programming",
    students: 30,
    Langauge: "Rust",
    averageGrade: 82,
    nextAssignment: "Rust Pointers",
    submissions: 25
  },
  {
    id: 3,
    name: "Object-Oriented Programming",
    students: 22,
    Langauge: "C++",
    averageGrade: 79,
    nextAssignment: "Abstract Classes",
    submissions: 20
  }
];

const TeacherDashboard = () => {
  const bgColor = useColorModeValue('white', '#1a1625');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p={8}>
      <HStack justify="space-between" mb={8}>
        <Heading>Teacher Dashboard</Heading>
        <HStack spacing={4}>
          <Bell size={24} />
          <Calendar size={24} />
        </HStack>
      </HStack>

      <StatGroup mb={8} gap={4}>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><Users size={16} /> <Text>Total Students</Text></HStack></StatLabel>
          <StatNumber>77</StatNumber>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><BookOpen size={16} /> <Text>Active Classes</Text></HStack></StatLabel>
          <StatNumber>3</StatNumber>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><Clock size={16} /> <Text>Pending Reviews</Text></HStack></StatLabel>
          <StatNumber>14</StatNumber>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><Award size={16} /> <Text>Average Grade</Text></HStack></StatLabel>
          <StatNumber>83%</StatNumber>
        </Stat>
      </StatGroup>

      <Heading size="md" mb={4}>Active Classes</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {classes.map(cls => (
          <Box 
            key={cls.id}
            p={6}
            bg={bgColor}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
            _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
            cursor="pointer"
          >
            <VStack align="start" spacing={4}>
              <HStack justify="space-between" w="100%">
                <Heading size="md">{cls.name}</Heading>
                <Badge colorScheme="purple">{cls.students} students</Badge>
                <Badge colorScheme="blue">{cls.Langauge}</Badge>
              </HStack>
              
              <Box w="100%">
                <Text color="gray.500" mb={2}>Average Grade</Text>
                <Box w="100%" h="2" bg="gray.100" borderRadius="full">
                  <Box
                    w={`${cls.averageGrade}%`}
                    h="100%"
                    bg="purple.500"
                    borderRadius="full"
                  />
                </Box>
                <Text fontSize="sm" color="gray.500" mt={1}>{cls.averageGrade}%</Text>
              </Box>

              <VStack align="start" spacing={1} w="100%">
                <Text color="gray.500">Next Assignment</Text>
                <Text fontWeight="medium">{cls.nextAssignment}</Text>
                <Text fontSize="sm" color="gray.500">
                  {cls.submissions} submissions out of {cls.students}
                </Text>
              </VStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;