import React from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, HStack, Heading } from '@chakra-ui/react';
import { ClipboardList } from 'lucide-react';

interface Student {
  no: number;
  id: string;
  name: string;
  scores: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
  };
}

interface TeacherLabScoreDetailsProps {
  selectedLab: string;
  students: Student[];
}

const TeacherLabScoreDetails = ({ selectedLab, students }: TeacherLabScoreDetailsProps) => {
  const getTotal = (scores: Student['scores']) => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  return (
    <Box bg="brand.bg.secondary" rounded="lg" shadow="sm" p={6}>
      <HStack justify="space-between" mb={6}>
        <HStack spacing={3}>
          <ClipboardList className="h-6 w-6 text-indigo-600" />
          <Heading as="h2" size="xl" color="brand.text.primary">{selectedLab}</Heading>
        </HStack>
        <Button bg="brand.accent.primary" color="brand.text.inverse" _hover={{ bg: "brand.accent.secondary" }}>
          Export Scores
        </Button>
      </HStack>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg="brand.bg.hover">
            <Tr>
              <Th>No.</Th>
              <Th>Student ID</Th>
              <Th>Name</Th>
              <Th>Q1</Th>
              <Th>Q2</Th>
              <Th>Q3</Th>
              <Th>Q4</Th>
              <Th>Q5</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student.id} _hover={{ bg: "brand.bg.hover" }}>
                <Td>{student.no}</Td>
                <Td>{student.id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.scores.q1}</Td>
                <Td>{student.scores.q2}</Td>
                <Td>{student.scores.q3}</Td>
                <Td>{student.scores.q4}</Td>
                <Td>{student.scores.q5}</Td>
                <Td color="brand.accent.primary">{getTotal(student.scores)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TeacherLabScoreDetails;