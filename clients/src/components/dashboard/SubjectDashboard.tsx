import React from 'react';
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
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
  return (
    <Box
      p={6}
      bg="brand.paper"
      borderRadius="lg"
      border="1px"
      borderColor="brand.border"
      _hover={{ 
        transform: 'translateY(-2px)', 
        transition: 'all 0.2s',
        bg: 'brand.hover'
      }}
      cursor="pointer"
    >
      <VStack align="start" spacing={4}>
        <Box color="brand.primary">
          {subject.icon}
        </Box>
        <Box>
          <Heading size="md" mb={2} color="brand.text.primary">{subject.name}</Heading>
          <Text color="brand.text.secondary">{subject.description}</Text>
        </Box>
        <Box w="100%" h="2" bg="brand.hover" borderRadius="full">
          <Box
            w={`${subject.progress}%`}
            h="100%"
            bg="brand.primary"
            borderRadius="full"
          />
        </Box>
        <Text fontSize="sm" color="brand.text.secondary">
          {subject.progress}% Complete
        </Text>
      </VStack>
    </Box>
  );
};

const SubjectDashboard = () => {
  return (
    <Box p={8}>
      <Heading mb={8} color="brand.text.primary">My Subjects</Heading>
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