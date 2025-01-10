import { Box, Text } from "@chakra-ui/react";
import { Question } from "../../types/questions";

interface QuestionHeaderProps {
  question: Question;
}

const QuestionHeader = ({ question }: QuestionHeaderProps) => {
  return (
    <Box mb={4}>
      <Text fontWeight="bold" color="brand.text.primary" mb={3} fontSize="lg">
        {question.id}. {question.title}
      </Text>
      <Text color="brand.text.secondary" mb={3}>
        {question.description}
      </Text>
      <Box bg="brand.bg.primary" p={4} borderRadius="md">
        <Text color="brand.text.secondary" fontFamily="monospace">
          For example:
        </Text>
        <Text color="brand.accent.primary" fontFamily="monospace" whiteSpace="pre-wrap">
          {question.example}
        </Text>
      </Box>
    </Box>
  );
};

export default QuestionHeader;