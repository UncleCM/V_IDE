import { VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { questions } from "../../data/questions";
import { QuestionListProps } from "../../types/questions";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ onSelectQuestion }: QuestionListProps) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleQuestionSelect = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedId(questionId);
      onSelectQuestion(question.defaultCode);
    }
  };

  return (
    <VStack spacing={4} align="stretch" mb={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Lab Questions
      </Text>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          isSelected={selectedId === question.id}
          onClick={() => handleQuestionSelect(question.id)}
        />
      ))}
    </VStack>
  );
};

export default QuestionList;