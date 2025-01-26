import React from 'react';
import { Box, VStack, Heading, Button } from '@chakra-ui/react';
import { PlusCircle } from 'lucide-react';

const QuestionSidebar = () => {
  return (
    <Box w="64" bg="brand.bg.secondary" p={4} borderRadius="lg" borderWidth="1px" borderColor="brand.border.light">
      <Heading size="md" mb={4}>Python Lab#2</Heading>
      <VStack spacing={2} align="stretch">
        <Box p={2} bg="brand.accent.info" color="white" borderRadius="md">
          Question 1
        </Box>
        <Box p={2} bg="brand.accent.success" color="white" borderRadius="md">
          Question 2
        </Box>
      </VStack>
      <Button
        leftIcon={<PlusCircle size={20} />}
        variant="ghost"
        mt={4}
        w="full"
        color="brand.text.secondary"
        _hover={{ color: 'brand.accent.primary' }}
      >
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionSidebar;