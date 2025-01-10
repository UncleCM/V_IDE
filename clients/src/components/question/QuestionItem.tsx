import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { ChevronRight, Circle, CheckCircle2, AlertCircle, Timer } from "lucide-react";
import { QuestionWithStatus } from "../../types/questions";

interface QuestionItemProps {
  question: QuestionWithStatus;
  isSelected: boolean;
  onClick: () => void;
}

const QuestionItem = ({ question, isSelected, onClick }: QuestionItemProps) => {
  const getStatusInfo = () => {
    switch (question.status) {
      case 'completed':
        return {
          icon: <CheckCircle2 size={16} color="var(--chakra-colors-brand-accent-success)" />,
          text: "Completed",
          color: "brand.accent.success"
        };
      case 'error':
        return {
          icon: <AlertCircle size={16} color="var(--chakra-colors-brand-accent-error)" />,
          text: "Error",
          color: "brand.accent.error"
        };
      case 'in-progress':
        return {
          icon: <Timer size={16} color="var(--chakra-colors-brand-accent-warning)" />,
          text: "In Progress",
          color: "brand.accent.warning"
        };
      default:
        return {
          icon: <Circle size={16} color="var(--chakra-colors-brand-text-disabled)" />,
          text: "Not Started",
          color: "brand.text.disabled"
        };
    }
  };

  const statusInfo = getStatusInfo();

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
      <VStack spacing={2} align="stretch">
        <HStack justify="space-between" spacing={3}>
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
        <HStack spacing={2}>
          {statusInfo.icon}
          <Text fontSize="sm" color={statusInfo.color}>
            {statusInfo.text}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default QuestionItem;