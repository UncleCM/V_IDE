import { useState } from 'react';
import { Box, Container, Grid } from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import LabScoreSidebar from '../components/lab-score/TeacherLabSidebar';
import TeacherLabScoreDetails from '../components/lab-score/TeacherLabScoreDetails';

// Mock student data
const mockStudents = [
  {
    no: 1,
    id: "6411234",
    name: "John Doe",
    scores: { q1: 5, q2: 4, q3: 5, q4: 5, q5: 4 }
  },
  {
    no: 2,
    id: "6411235",
    name: "Jane Smith",
    scores: { q1: 4, q2: 5, q3: 4, q4: 5, q5: 5 }
  },
  {
    no: 3,
    id: "6411236",
    name: "Bob Johnson",
    scores: { q1: 5, q2: 5, q3: 5, q4: 4, q5: 5 }
  }
];

const TeacherLabScorePage = () => {
  const [selectedLab, setSelectedLab] = useState('Python Lab#2');

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="7xl" py={6}>
        <Grid templateColumns="250px 1fr" gap={6}>
          <LabScoreSidebar
            selectedLab={selectedLab}
            onLabSelect={setSelectedLab}
          />
          <TeacherLabScoreDetails
            selectedLab={selectedLab}
            students={mockStudents}
          />
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherLabScorePage;