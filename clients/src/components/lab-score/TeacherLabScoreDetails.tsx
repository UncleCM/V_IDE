import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FileSpreadsheet } from 'lucide-react';

interface Student {
  no: number;
  id: string;
  name: string;
  labScores: {
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

const TeacherLabScoreDetails: React.FC<TeacherLabScoreDetailsProps> = ({
  selectedLab,
  students,
}) => {
  const calculateSum = (labScores: Student['labScores']): number => {
    return Object.values(labScores).reduce((sum, score) => sum + score, 0);
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <Heading size="lg" color="brand.text.primary">
            {selectedLab}
          </Heading>
          <Button
            leftIcon={<FileSpreadsheet size={20} />}
            colorScheme="orange"
            variant="outline"
          >
            Export to Excel File
          </Button>
        </HStack>

        <Heading size="md" color="brand.text.primary">
          Assessment of Python Lab#2
        </Heading>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Student ID</Th>
                <Th>Student Name</Th>
                <Th>Q1</Th>
                <Th>Q2</Th>
                <Th>Q3</Th>
                <Th>Q4</Th>
                <Th>Q5</Th>
                <Th>Sum</Th>
                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student) => (
                <Tr key={student.id}>
                  <Td>{student.no}</Td>
                  <Td>{student.id}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.labScores.q1}</Td>
                  <Td>{student.labScores.q2}</Td>
                  <Td>{student.labScores.q3}</Td>
                  <Td>{student.labScores.q4}</Td>
                  <Td>{student.labScores.q5}</Td>
                  <Td>{calculateSum(student.labScores)}</Td>
                  <Td>
                    <Button size="sm" colorScheme="green" variant="outline">
                      Detail
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default TeacherLabScoreDetails;