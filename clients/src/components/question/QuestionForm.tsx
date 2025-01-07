import { VStack, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { Question } from "../../types/questions";

interface QuestionFormProps {
  question: Partial<Question>;
  onQuestionChange: (question: Partial<Question>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const QuestionForm = ({ question, onQuestionChange, onSubmit }: QuestionFormProps) => {
  return (
    <VStack spacing={6} bg="#1a1625" p={8} borderRadius="lg">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input 
          value={question.title}
          onChange={(e) => onQuestionChange({ ...question, title: e.target.value })}
          bg="#110c1b"
          border="none"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea 
          value={question.description}
          onChange={(e) => onQuestionChange({ ...question, description: e.target.value })}
          bg="#110c1b"
          border="none"
          minH="100px"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Example</FormLabel>
        <Textarea 
          value={question.example}
          onChange={(e) => onQuestionChange({ ...question, example: e.target.value })}
          bg="#110c1b"
          border="none"
          fontFamily="monospace"
          minH="150px"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Default Code</FormLabel>
        <Textarea 
          value={question.defaultCode}
          onChange={(e) => onQuestionChange({ ...question, defaultCode: e.target.value })}
          bg="#110c1b"
          border="none"
          fontFamily="monospace"
          minH="150px"
        />
      </FormControl>

      <Button 
        colorScheme="purple" 
        width="full" 
        onClick={onSubmit}
      >
        Create Question
      </Button>
    </VStack>
  );
};

export default QuestionForm;