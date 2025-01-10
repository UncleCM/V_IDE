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
      bg={isSelected ? "brand.bg.active" : "brand.bg.secondary"}
      borderRadius="md"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "brand.bg.hover" }}
    >
      <Text fontWeight="bold" mb={2} color="brand.text.primary">
        {question.id}. {question.title}
      </Text>
      <Text color="brand.text.secondary">{question.description}</Text>
    </Box>
  );
};

export default QuestionItem;