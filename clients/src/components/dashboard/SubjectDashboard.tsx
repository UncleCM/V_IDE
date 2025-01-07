import React from 'react';
import { Box, Grid, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Code } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
}

const subjects: Subject[] = [
    {
        id: 1,
        name: "Computer and Programming",
        description: "Learn the basics of computer programming through Python",
        icon: <Code size={48} />,
        progress: 25
    },
    {
        id: 2,
        name: "Elementary System Programming",
        description: "Learn the basics of system programming through Rust",
        icon: <Code size={48} />,
        progress: 50
    },
    {
        id: 3,
        name: "Object-Oriented Programming",
        description: "Learn the basics of object-oriented programming through C++",
        icon: <Code size={48} />,
        progress: 75
    }
  
];

const SubjectCard = ({ subject }: { subject: Subject }) => {
  const bgColor = useColorModeValue('white', '#1a1625');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
      cursor="pointer"
    >
      <VStack align="start" spacing={4}>
        <Box color="purple.500">
          {subject.icon}
        </Box>
        <Box>
          <Heading size="md" mb={2}>{subject.name}</Heading>
          <Text color="gray.500">{subject.description}</Text>
        </Box>
        <Box w="100%" h="2" bg="gray.100" borderRadius="full">
          <Box
            w={`${subject.progress}%`}
            h="100%"
            bg="purple.500"
            borderRadius="full"
          />
        </Box>
        <Text fontSize="sm" color="gray.500">
          {subject.progress}% Complete
        </Text>
      </VStack>
    </Box>
  );
};

const SubjectDashboard = () => {
  return (
    <Box p={8}>
      <Heading mb={8}>My Subjects</Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        }}
        gap={6}
      >
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </Grid>
    </Box>
  );
};

export default SubjectDashboard;