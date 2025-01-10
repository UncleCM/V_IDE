import { VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { questions } from "../../data/questions";
import { getUserSubmissions } from "../../api/codeApi";
import QuestionStatus from "./QuestionStatus";
import type { CodeExecutionResponse } from "../../api/codeApi";

interface QuestionNavProps {
  selectedId: number;
  onSelectQuestion: (code: string) => void;
}

interface QuestionState {
  status: 'not-started' | 'in-progress' | 'completed' | 'error';
  score?: number;
  lastSubmission?: CodeExecutionResponse;
}

const QuestionNav = ({ selectedId, onSelectQuestion }: QuestionNavProps) => {
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>({});

  useEffect(() => {
    const loadSubmissions = async () => {
      const states: Record<number, QuestionState> = {};
      
      for (const question of questions) {
        try {
          const submissions = await getUserSubmissions(question.id);
          if (submissions.length === 0) {
            states[question.id] = { status: 'not-started' };
          } else {
            const lastSubmission = submissions[submissions.length - 1];
            states[question.id] = {
              status: lastSubmission.score === 5 ? 'completed' : 'in-progress',
              score: lastSubmission.score,
              lastSubmission
            };
          }
        } catch (error) {
          console.error(`Error loading submissions for question ${question.id}:`, error);
          states[question.id] = { status: 'not-started' };
        }
      }
      
      setQuestionStates(states);
    };

    loadSubmissions();
  }, []);

  const handleQuestionSelect = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const state = questionStates[questionId];
      const code = state?.lastSubmission?.code || question.defaultCode;
      onSelectQuestion(code);
    }
  };

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <Text fontSize="lg" fontWeight="bold" color="brand.text.primary" mb={2}>
        Questions Progress
      </Text>
      {questions.map((question) => (
        <QuestionStatus
          key={question.id}
          question={question}
          isSelected={selectedId === question.id}
          status={questionStates[question.id]?.status || 'not-started'}
          score={questionStates[question.id]?.score}
          onClick={() => handleQuestionSelect(question.id)}
        />
      ))}
    </VStack>
  );
};

export default QuestionNav;