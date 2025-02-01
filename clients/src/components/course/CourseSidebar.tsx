import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';

const CourseSidebar = () => {
  return (
    <Box w="64" bg="orange.50" p={4} borderRadius="lg" shadow="sm">
      <Heading size="md" mb={4} color="orange.800">SE Program</Heading>
      <VStack spacing={2} align="stretch">
        <Box p={3} bg="green.100" color="green.800" borderRadius="md">
          <Text fontWeight="medium">Year1</Text>
        </Box>
        <Box p={3} bg="green.200" color="green.800" borderRadius="md">
          <Text fontWeight="medium">Year2</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default CourseSidebar