import { VStack } from "@chakra-ui/react";
import { questions } from "../data/questions";
import QuestionEditor from "./question/QuestionEditor";

const CodeEditor = () => {
  return (
    <VStack spacing={8} align="stretch">
      {questions.map((question) => (
        <QuestionEditor key={question.id} question={question} />
      ))}
    </VStack>
  );
};

export default CodeEditor;