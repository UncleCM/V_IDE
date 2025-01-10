import { Box, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Question } from "../types/questions";
import QuestionForm from "../components/question/QuestionForm";

const QuestionCreatorPage = () => {
  const [question, setQuestion] = useState<Partial<Question>>({
    title: "",
    description: "",
    example: "",
    defaultCode: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement question submission
    console.log(question);
  };

  return (
    <Box minH="100vh" bg="brand.bg">
      <Container maxW="container.md" py={8}>
        <QuestionForm
          question={question}
          onQuestionChange={setQuestion}
          onSubmit={handleSubmit}
        />
      </Container>
    </Box>
  );
};

export default QuestionCreatorPage;