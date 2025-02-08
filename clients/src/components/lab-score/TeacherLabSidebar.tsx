import React from 'react';
import { Box, Button, Text, VStack, HStack, Heading } from '@chakra-ui/react';
import { Beaker } from 'lucide-react';

interface TeacherLabSidebarProps {
  selectedLab: string;
  onLabSelect: (lab: string) => void;
}

const labs = [
  'Python Lab#1',
  'Python Lab#2',
  'Python Lab#3',
  'Java Lab#1',
  'Java Lab#2',
];

const TeacherLabSidebar = ({ selectedLab, onLabSelect }: TeacherLabSidebarProps) => {
  return (
    <Box bg="brand.bg.secondary" rounded="lg" shadow="sm" p={4}>
      <HStack spacing={2} mb={6}>
        <Beaker className="h-5 w-5 text-indigo-600" />
        <Heading as="h2" size="lg" color="brand.text.primary">Lab Sessions</Heading>
      </HStack>
      <VStack spacing={2}>
        {labs.map((lab) => (
          <Button
            key={lab}
            onClick={() => onLabSelect(lab)}
            w="full"
            textAlign="left"
            px={4}
            py={2}
            rounded="md"
            transition="background-color 0.2s"
            bg={selectedLab === lab ? "brand.bg.hover" : "transparent"}
            color={selectedLab === lab ? "brand.text.primary" : "brand.text.secondary"}
            fontWeight={selectedLab === lab ? "medium" : "normal"}
            _hover={{ bg: "brand.bg.hover" }}
          >
            {lab}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default TeacherLabSidebar;