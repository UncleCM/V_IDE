import { Box, Text } from "@chakra-ui/react";
import { Question } from "../../types/questions";

interface QuestionHeaderProps {
  question: Question;
}

const QuestionHeader = ({ question }: QuestionHeaderProps) => {
  return (
    <Box mb={4}>
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
  );
};

export default QuestionHeader;