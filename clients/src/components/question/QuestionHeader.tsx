import { Box, Text, VStack} from "@chakra-ui/react";
import { Timer } from "lucide-react";
import { Question } from "../../types/questions";
import QuestionTimer from "../timer/QuestionTimer";

interface QuestionHeaderProps {
  question: Question;
}

const QuestionHeader = ({ question }: QuestionHeaderProps) => {
  return (
    <VStack align="stretch" spacing={3} bg="brand.bg.secondary" p={4} borderRadius="md" position="relative">
      {/* Timer positioned in top-right corner */}
      <Box position="absolute" top={4} right={4}>
        <QuestionTimer questionId={question.id} />
      </Box>

      <Text fontWeight="bold" color="brand.text.primary" fontSize="lg">
        {question.id}. {question.title}
      </Text>
      <Text color="brand.text.secondary">
        {question.description}
      </Text>
      <Box bg="brand.bg.primary" p={4} borderRadius="md">
        <Text color="brand.text.secondary" fontFamily="monospace" mb={2}>
          Example:
        </Text>
        <Text color="brand.accent.primary" fontFamily="monospace" whiteSpace="pre-wrap">
          {question.example}
        </Text>
      </Box>
    </VStack>
  );
};

export default QuestionHeader;