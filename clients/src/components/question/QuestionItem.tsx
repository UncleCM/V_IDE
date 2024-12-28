import { Box, Text } from "@chakra-ui/react";
import { Question } from "../../types/questions";

interface QuestionItemProps {
  question: Question;
  isSelected: boolean;
  onClick: () => void;
}

const QuestionItem = ({ question, isSelected, onClick }: QuestionItemProps) => {
  return (
    <Box
      p={4}
      bg={isSelected ? "#1a1625" : "#110c1b"}
      borderRadius="md"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "#1a1625" }}
    >
      <Text fontWeight="bold" mb={2}>
        {question.id}. {question.title}
      </Text>
      <Text color="gray.400">{question.description}</Text>
    </Box>
  );
};

export default QuestionItem;