import { Box, Container } from '@chakra-ui/react';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';

const TeacherDashboardPage = () => {
  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Container maxW="container.xl" py={8}>
        <TeacherDashboard />
      </Container>
    </Box>
  );
};

export default TeacherDashboardPage;  