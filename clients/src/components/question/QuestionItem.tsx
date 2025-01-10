import { Box, HStack, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { Question } from "../../types/questions";

interface QuestionItemProps {
  question: Question;
  isSelected: boolean;
  onClick: () => void;
}

const QuestionItem = ({ question, isSelected, onClick }: QuestionItemProps) => {
  return (
    <Box
      p={3}
      bg={isSelected ? "brand.bg.active" : "brand.bg.secondary"}
      borderRadius="md"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: "brand.bg.hover" }}
      borderLeft={isSelected ? "4px solid" : "4px solid transparent"}
      borderLeftColor={isSelected ? "brand.accent.primary" : "transparent"}
    >
      <HStack justify="space-between">
        <Text 
          fontWeight={isSelected ? "semibold" : "medium"} 
          color={isSelected ? "brand.text.primary" : "brand.text.secondary"}
        >
          {question.id}. {question.title}
        </Text>
        <ChevronRight 
          size={16} 
          color={isSelected ? "var(--chakra-colors-brand-accent-primary)" : "var(--chakra-colors-brand-text-disabled)"}
        />
      </HStack>
    </Box>
  );
};

export default QuestionItem;