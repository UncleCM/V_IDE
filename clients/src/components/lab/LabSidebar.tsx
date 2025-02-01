import React from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

const LabSidebar = () => {
  return (
    <Box w="64" bg="blue.50" p={4} borderRadius="lg" shadow="sm">
      <Heading size="md" mb={4} color="blue.800">Python Programming</Heading>
      <VStack spacing={2} align="stretch">
        <Box p={3} bg="green.100" color="green.800" borderRadius="md">
          <Text fontWeight="medium">Python Lab#1</Text>
        </Box>
        <Box p={3} bg="green.200" color="green.800" borderRadius="md">
          <Text fontWeight="medium">Python Lab#2</Text>
        </Box>
      </VStack>
      <Button
        leftIcon={<Plus size={20} />}
        variant="outline"
        colorScheme="orange"
        mt={4}
        w="full"
      >
        Edit/Add Lab
      </Button>
    </Box>
  );
};

export default LabSidebar;