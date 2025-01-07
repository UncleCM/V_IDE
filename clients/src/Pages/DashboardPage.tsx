import { Box, Container } from '@chakra-ui/react';
import SubjectDashboard from '../components/dashboard/SubjectDashboard';

const DashboardPage = () => {
  return (
    <Box minH="100vh" bg="#0f0a19">
      <Container maxW="container.xl" py={8}>
        <SubjectDashboard />
      </Container>
    </Box>
  );
};

export default DashboardPage;