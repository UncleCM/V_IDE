import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, HStack, Heading, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FileSpreadsheet, X } from 'lucide-react';

interface Student {
  no: number;
  id: string;
  name: string;
  labScores: {
    [key: string]: number;
  };
}

interface GradingCriteria {
  min: number;
  max: number;
  grade: string;
}

interface TeacherCourseSummaryProps {
  selectedLab: string;
  students: Student[];
}

const TeacherCourseSummary = ({ selectedLab }: TeacherCourseSummaryProps) => {
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [gradingCriteria, setGradingCriteria] = useState<GradingCriteria[]>([
    { min: 80, max: 100, grade: 'A' },
    { min: 70, max: 79, grade: 'B+' },
    { min: 60, max: 69, grade: 'B' },
  ]);
  const [editingCriteria, setEditingCriteria] = useState<GradingCriteria[]>([]);

  const mockStudents = [
    {
      no: 1,
      id: "6411234",
      name: "John Doe",
      labScores: {
        lab1: 85,
        lab2: 90,
        lab3: 88,
        lab14: 92
      }
    },
    {
      no: 2,
      id: "6411235",
      name: "Jane Smith",
      labScores: {
        lab1: 92,
        lab2: 88,
        lab3: 95,
        lab14: 90
      }
    },
    {
      no: 3,
      id: "6411236",
      name: "Bob Johnson",
      labScores: {
        lab1: 78,
        lab2: 85,
        lab3: 80,
        lab14: 88
      }
    }
  ];

  const calculateTotal = (scores: { [key: string]: number }) => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const getGrade = (total: number) => {
    const average = total / 4; // Assuming 4 labs
    for (const criteria of gradingCriteria) {
      if (average >= criteria.min && average <= criteria.max) {
        return criteria.grade;
      }
    }
    return 'F';
  };

  const openGradingModal = () => {
    setEditingCriteria([...gradingCriteria]);
    setIsGradingModalOpen(true);
  };

  const handleCriteriaSave = () => {
    setGradingCriteria([...editingCriteria]);
    setIsGradingModalOpen(false);
  };

  const handleCriteriaChange = (index: number, field: keyof GradingCriteria, value: string) => {
    const newCriteria = [...editingCriteria];
    if (field === 'grade') {
      newCriteria[index][field] = value;
    } else {
      newCriteria[index][field] = Number(value);
    }
    setEditingCriteria(newCriteria);
  };

  return (
    <Box bg="brand.bg.secondary" rounded="lg" shadow="sm" p={6}>
      <HStack justify="space-between" mb={6}>
        <VStack align="start">
          <Heading size="lg" color="brand.text.primary">{selectedLab}</Heading>
          <Text fontSize="md" color="brand.text.secondary">Course Assessment</Text>
        </VStack>
        <Button leftIcon={<FileSpreadsheet size={20} />} colorScheme="orange" variant="outline">
          Export to Excel File
        </Button>
      </HStack>

      <Box overflowX="auto" mb={8}>
        <Table variant="simple">
          <Thead bg="brand.bg.hover">
            <Tr>
              <Th>No</Th>
              <Th>Student ID</Th>
              <Th>Student Name</Th>
              <Th>Lab1</Th>
              <Th>Lab2</Th>
              <Th>Lab3</Th>
              <Th>...</Th>
              <Th>Lab14</Th>
              <Th>Total</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockStudents.map((student) => (
              <Tr key={student.id} _hover={{ bg: "brand.bg.hover" }}>
                <Td>{student.no}</Td>
                <Td>{student.id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.labScores.lab1}</Td>
                <Td>{student.labScores.lab2}</Td>
                <Td>{student.labScores.lab3}</Td>
                <Td>...</Td>
                <Td>{student.labScores.lab14}</Td>
                <Td color="brand.accent.primary">{calculateTotal(student.labScores)}</Td>
                <Td color="brand.accent.success">{getGrade(calculateTotal(student.labScores))}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={8}>
        <Box bg="yellow.50" rounded="lg" p={4}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Min</Th>
                <Th>Student</Th>
                <Th>Max</Th>
                <Th>Grade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {gradingCriteria.map((criteria, index) => (
                <Tr key={index}>
                  <Td>{criteria.min}</Td>
                  <Td>&lt; Score &lt;=</Td>
                  <Td>{criteria.max}</Td>
                  <Td>{criteria.grade}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <VStack align="start" spacing={4}>
          <Button onClick={openGradingModal} colorScheme="purple">
            Grading
          </Button>
          <Button leftIcon={<FileSpreadsheet size={20} />} colorScheme="orange" variant="outline">
            Export to Excel
          </Button>
        </VStack>
      </Box>

      {/* Grading Modal */}
      <Modal isOpen={isGradingModalOpen} onClose={() => setIsGradingModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Grading Criteria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {editingCriteria.map((criteria, index) => (
                <HStack key={index} spacing={4}>
                  <Box>
                    <Text>Min Score</Text>
                    <Input
                      type="number"
                      value={criteria.min}
                      onChange={(e) => handleCriteriaChange(index, 'min', e.target.value)}
                    />
                  </Box>
                  <Box>
                    <Text>Max Score</Text>
                    <Input
                      type="number"
                      value={criteria.max}
                      onChange={(e) => handleCriteriaChange(index, 'max', e.target.value)}
                    />
                  </Box>
                  <Box>
                    <Text>Grade</Text>
                    <Input
                      type="text"
                      value={criteria.grade}
                      onChange={(e) => handleCriteriaChange(index, 'grade', e.target.value)}
                    />
                  </Box>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsGradingModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={handleCriteriaSave}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeacherCourseSummary;