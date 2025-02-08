import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import LabScoreDetails from '../components/lab-score/LabScoreDetails';

interface GradeScale {
  min: number;
  max: number;
  grade: string;
}

const gradeScales: GradeScale[] = [
  { min: 80, max: 100, grade: 'A' },
  { min: 70, max: 79, grade: 'B+' },
  { min: 60, max: 69, grade: 'B' },
];

const mockLabData = [
  {
    id: 1,
    name: 'Python Lab#1',
    score: 5,
    time: '2h 30m',
    performance: 'Excellent',
  },
  {
    id: 2,
    name: 'Python Lab#2',
    score: 4,
    time: '1h 45m',
    performance: 'Good',
  },
  // Add more mock data as needed
];

const LabScorePageSummary = () => {
  const [selectedLab, setSelectedLab] = useState('Python Programming');

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="7xl" py={6}>
        <Grid templateColumns="250px 1fr" gap={6}>
          {/* Left Sidebar */}
          <VStack align="stretch" spacing={2} bg="blue.50" p={4} borderRadius="lg">
            <Heading size="md" color="blue.800" mb={4}>
              Python Programming
            </Heading>
            {Array.from({ length: 8 }, (_, i) => (
              <Box
                key={i}
                p={3}
                bg={i % 2 === 0 ? 'green.100' : 'green.200'}
                color="green.800"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'green.300' }}
              >
                <Text fontWeight="medium">Python Lab#{i + 1}</Text>
              </Box>
            ))}
            <Box p={3} bg="green.300" color="green.800" borderRadius="md" mt={4}>
              <Text fontWeight="bold">Summary</Text>
            </Box>
          </VStack>

          {/* Main Content */}
          <LabScoreDetails
            selectedLab={selectedLab}
            labData={mockLabData}
            gradeScales={gradeScales}
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default LabScorePageSummary;