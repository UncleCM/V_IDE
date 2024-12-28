import { VStack, Box, Text } from "@chakra-ui/react";
import { questions } from "../data/questions";

interface QuestionListProps {
  onSelectQuestion: (code: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ onSelectQuestion }) => {
  return (
    <VStack spacing={6} align="stretch" w="100%">
      <Text fontSize="2xl" fontWeight="bold" color="white">
        Homework #10 - Python Programming
      </Text>
      {questions.map((question) => (
        <Box
          key={question.id}
          p={6}
          bg="#1a1625"
          borderRadius="md"
          onClick={() => onSelectQuestion(question.defaultCode)}
          cursor="pointer"
          _hover={{ bg: "#231d31" }}
        >
          <Text fontWeight="bold" color="white" mb={3} fontSize="lg">
            {question.id}. {question.title}
          </Text>
          <Text color="gray.300" mb={3}>
            {question.description}
          </Text>
          <Box bg="#110c1b" p={4} borderRadius="md">
            <Text color="gray.400" fontFamily="monospace">
              For example:
            </Text>
            <Text color="blue.300" fontFamily="monospace" whiteSpace="pre-wrap">
              {question.example}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default QuestionList;