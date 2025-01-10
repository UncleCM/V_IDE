import { VStack } from "@chakra-ui/react";
import { questions } from "../../data/questions";
import { Question, QuestionListProps } from "../../types/questions";
import QuestionItem from "./QuestionItem";
import { useState } from "react";

const QuestionList = ({ onSelectQuestion }: QuestionListProps) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleQuestionSelect = (question: Question) => {
    setSelectedId(question.id);
    onSelectQuestion(question);
  };

  return (
    <VStack spacing={2} align="stretch">
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          isSelected={selectedId === question.id}
          onClick={() => handleQuestionSelect(question)}
        />
      ))}
    </VStack>
  );
};

export default QuestionList;