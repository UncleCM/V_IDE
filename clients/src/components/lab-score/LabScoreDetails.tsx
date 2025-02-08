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
  Grid,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Printer as Print } from 'lucide-react';

interface GradeScale {
  min: number;
  max: number;
  grade: string;
}

interface Lab {
  id: number;
  name: string;
  score: number;
  time: string;
  performance: string;
}

interface LabScoreDetailsProps {
  selectedLab: string;
  labData: Lab[];
  gradeScales: GradeScale[];
}

const LabScoreDetails: React.FC<LabScoreDetailsProps> = ({
  selectedLab,
  labData,
  gradeScales,
}) => {
  const totalScore = labData.reduce((sum, lab) => sum + lab.score, 0);

  const calculateGrade = (score: number): string => {
    const percentage = (score / (labData.length * 5)) * 100;
    const gradeScale = gradeScales.find(
      scale => percentage >= scale.min && percentage <= scale.max
    );
    return gradeScale?.grade || 'F';
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <Heading size="lg" color="brand.text.primary">
            {selectedLab}
          </Heading>
          <Button
            leftIcon={<Print size={20} />}
            colorScheme="orange"
            variant="outline"
          >
            Print
          </Button>
        </HStack>

        <Heading size="md" color="brand.text.primary">
          Course Assessment
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Question</Th>
              <Th>Question Name</Th>
              <Th>Score</Th>
              <Th>Time</Th>
              <Th>Performance</Th>
              <Th>View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {labData.map(lab => (
              <Tr key={lab.id}>
                <Td>Python Lab#{lab.id}</Td>
                <Td>{lab.name}</Td>
                <Td>{lab.score}</Td>
                <Td>{lab.time}</Td>
                <Td>{lab.performance}</Td>
                <Td>
                  <Button size="sm" colorScheme="green" variant="outline">
                    Detail
                  </Button>
                </Td>
              </Tr>
            ))}
            <Tr fontWeight="bold">
              <Td>Total</Td>
              <Td></Td>
              <Td>{totalScore}</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>

        <Grid templateColumns="300px 1fr" gap={12}>
          {/* Grade Scale Table */}
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Min</Th>
                <Th>Student</Th>
                <Th>Max</Th>
                <Th>Grade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {gradeScales.map((scale, index) => (
                <Tr key={index}>
                  <Td>{scale.min}</Td>
                  <Td>{`< Score <=`}</Td>
                  <Td>{scale.max}</Td>
                  <Td>{scale.grade}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
              
          {/* Grade Display */}
          <Box
            bg="green.50"
            p={8}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="4xl" fontWeight="bold" color="green.700">
              Grade {calculateGrade(totalScore)}
            </Text>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default LabScoreDetails;