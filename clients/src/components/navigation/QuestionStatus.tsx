import { Box, VStack, Text, Progress, Icon, Tooltip, HStack } from "@chakra-ui/react";
import { CheckCircle, Circle, AlertCircle, Clock } from "lucide-react";
import { Question } from "../../types/questions";

interface QuestionStatusProps {
  question: Question;
  isSelected: boolean;
  status: 'not-started' | 'in-progress' | 'completed' | 'error';
  score?: number;
  onClick: () => void;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return <Icon as={CheckCircle} color="brand.accent.success" />;
    case 'error':
      return <Icon as={AlertCircle} color="brand.accent.error" />;
    case 'in-progress':
      return <Icon as={Clock} color="brand.accent.warning" />;
    default:
      return <Icon as={Circle} color="brand.text.disabled" />;
  }
};

const QuestionStatus = ({ question, isSelected, status, score, onClick }: QuestionStatusProps) => {
  return (
    <Box
      p={4}
      bg={isSelected ? "brand.bg.active" : "brand.bg.secondary"}
      borderRadius="md"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "brand.bg.hover" }}
      position="relative"
    >
      <HStack spacing={3} align="start">
        <Tooltip label={`Status: ${status.replace('-', ' ')}`}>
          <Box pt={1}>
            <StatusIcon status={status} />
          </Box>
        </Tooltip>
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" color="brand.text.primary">
            {question.id}. {question.title}
          </Text>
          <Text fontSize="sm" color="brand.text.secondary" noOfLines={2}>
            {question.description}
          </Text>
          {score !== undefined && (
            <Progress
              value={score * 20} // Convert 0-5 score to 0-100%
              size="xs"
              width="100%"
              colorScheme="purple"
              borderRadius="full"
            />
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default QuestionStatus;