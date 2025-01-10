import { VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { questions } from "../../data/questions";
import { Question, QuestionListProps, QuestionWithStatus } from "../../types/questions";
import QuestionItem from "./QuestionItem";
import { getUserSubmissions } from "../../api/codeApi";

const QuestionList = ({ onSelectQuestion }: QuestionListProps) => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [questionsWithStatus, setQuestionsWithStatus] = useState<QuestionWithStatus[]>(
    questions.map(q => ({ ...q, status: 'not-started' }))
  );

  // Load initial statuses from submissions
  useEffect(() => {
    const loadQuestionStatuses = async () => {
      const updatedQuestions = await Promise.all(
        questions.map(async (question) => {
          try {
            const submissions = await getUserSubmissions(question.id);
            
            // If this is the selected question, mark it as in-progress
            if (question.id === selectedId) {
              return { ...question, status: 'in-progress' as const };
            }
            
            // Otherwise determine status from submissions
            if (submissions.length === 0) {
              return { ...question, status: 'not-started' as const };
            }

            const lastSubmission = submissions[submissions.length - 1];
            let status: QuestionWithStatus['status'] = 'not-started';

            if (lastSubmission.score === 5) {
              status = 'completed';
            } else if (lastSubmission.output === null) {
              status = 'error';
            }

            return { ...question, status };
          } catch (error) {
            console.error(`Error loading status for question ${question.id}:`, error);
            return { ...question, status: 'not-started' as const };
          }
        })
      );

      setQuestionsWithStatus(updatedQuestions);
    };

    loadQuestionStatuses();
  }, [selectedId]); // Re-run when selected question changes

  const handleQuestionSelect = (question: Question) => {
    setSelectedId(question.id);
    onSelectQuestion(question);
  };

  return (
    <VStack spacing={2} align="stretch">
      {questionsWithStatus.map((question) => (
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