import React from 'react';
import { Box, VStack, Button, Text } from '@chakra-ui/react';

interface TeacherLabSidebarProps {
  selectedLab: string;
  onLabSelect: (lab: string) => void;
}

const TeacherLabSidebar: React.FC<TeacherLabSidebarProps> = ({
  selectedLab,
  onLabSelect,
}) => {
  return (
    <VStack align="stretch" spacing={2} bg="blue.50" p={4} borderRadius="lg">
      <Text fontSize="lg" fontWeight="bold" color="blue.800" mb={2}>
        Python Programming
      </Text>
      
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={i}
          p={3}
          bg={selectedLab === `Python Lab#${i + 1}` ? 'green.300' : i % 2 === 0 ? 'green.100' : 'green.200'}
          color="green.800"
          borderRadius="md"
          cursor="pointer"
          onClick={() => onLabSelect(`Python Lab#${i + 1}`)}
          _hover={{ bg: 'green.300' }}
        >
          <Text fontWeight="medium">Python Lab#{i + 1}</Text>
        </Box>
      ))}
      
      <Box p={3} bg="green.100" color="green.800" borderRadius="md">
        <Text fontWeight="bold">Summary</Text>
      </Box>
      
      <Box p={3} bg="green.100" color="green.800" borderRadius="md">
        <Text fontWeight="bold">Grades</Text>
      </Box>
      
      <Button
        colorScheme="orange"
        variant="solid"
        size="md"
        mt={2}
      >
        Grading
      </Button>
    </VStack>
  );
};

export default TeacherLabSidebar;