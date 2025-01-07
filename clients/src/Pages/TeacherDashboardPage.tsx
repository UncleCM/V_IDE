import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';

const TeacherDashboardPage = () => {
  return (
    <Box minH="100vh" bg="#0f0a19">
      <Container maxW="container.xl" py={8}>
        <TeacherDashboard />
      </Container>
    </Box>
  );
};

export default TeacherDashboardPage;