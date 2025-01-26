import { useState } from 'react';
import { Box, Container, Flex, useToast } from '@chakra-ui/react';
import { Question, TestCase, TestData } from '../types/questions';
import Header from '../components/Layout/Header';
import QuestionSidebar from '../components/sidebar/QuestionSidebar';
import QuestionForm from '../components/question/QuestionForm';

// Mock service for saving/updating questions
const questionService = {
  saveQuestion: async (question: Question) => {
    // Simulate API call
    console.log('Saving question:', question);
    return { ...question, id: Date.now() }; // Return question with new ID
  },
  updateQuestion: async (question: Question) => {
    // Simulate API call
    console.log('Updating question:', question);
    return question;
  }
};

const QuestionCreatorPage = () => {
  const toast = useToast();
  const [question, setQuestion] = useState<Question>({
    id: 0,
    title: '',
    name: '',
    number: '',
    language: 'Python',
    duration: { hours: '0', minutes: '30' },
    tags: [],
    tutorial: '',
    question: '',
    description: '',
    example: '',
    defaultCode: '',
    fullCodeTest: '',
    score: '1',
    testCases: [],
    testData: []
  });

  const handleQuestionChange = (field: keyof Question, value: any) => {
    setQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDurationChange = (field: keyof Question['duration'], value: string) => {
    setQuestion(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [field]: value
      }
    }));
  };

  const handleSaveQuestion = async (questionToSave: Question) => {
    try {
      const savedQuestion = await questionService.saveQuestion(questionToSave);
      setQuestion(savedQuestion);
      toast({
        title: "Question Saved",
        description: "The question was successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Unable to save the question.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateQuestion = async (questionToUpdate: Question) => {
    try {
      const updatedQuestion = await questionService.updateQuestion(questionToUpdate);
      setQuestion(updatedQuestion);
      toast({
        title: "Question Updated",
        description: "The question was successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Unable to update the question.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="7xl" py={4}>
        <Flex gap={4}>
          <QuestionSidebar />
          <QuestionForm
            question={question}
            onQuestionChange={handleQuestionChange}
            onDurationChange={handleDurationChange}
            onSave={handleSaveQuestion}
            onUpdate={handleUpdateQuestion} onTestCaseChange={function (index: number, field: keyof TestCase, value: any): void {
              throw new Error('Function not implemented.');
            } } onTestDataChange={function (index: number, field: keyof TestData, value: any): void {
              throw new Error('Function not implemented.');
            } } onAddTestCase={function (): void {
              throw new Error('Function not implemented.');
            } } onAddTestData={function (): void {
              throw new Error('Function not implemented.');
            } } onRemoveTestCase={function (index: number): void {
              throw new Error('Function not implemented.');
            } } onRemoveTestData={function (index: number): void {
              throw new Error('Function not implemented.');
            } }          />
        </Flex>
      </Container>
    </Box>
  );
}

export default QuestionCreatorPage;