import { useState } from 'react';
import { Box, Container, Flex, useToast } from '@chakra-ui/react';
import { Question, TestCase, TestData, SupportedLanguage } from '../types/questions';
import Header from '../components/Layout/Header';
import QuestionSidebar from '../components/sidebar/QuestionSidebar';
import QuestionForm from '../components/question/QuestionForm';

const questionService = {
  saveQuestion: async (question: Question) => {
    console.log('Saving question:', question);
    return { ...question, id: Date.now() };
  },
  updateQuestion: async (question: Question) => {
    console.log('Updating question:', question);
    return question;
  }
};

const QuestionCreatorPage = () => {
  const toast = useToast();
  const [question, setQuestion] = useState<Question>({
    id: 0,
    title: '',
    description: '',
    example: '',
    defaultCode: '',
    name: '',
    number: '2',
    language: 'Python',
    duration: { hours: '0', minutes: '30' },
    tags: ['For Loop'],
    tutorial: 'Tutorial for teaching programming concepts for each lab class.',
    question: '',
    fullCodeTest: '',
    score: '1',
    testCases: [
      { id: 1, description: 'Test case 1', score: 1 },
      { id: 2, description: 'Test case 2', score: 1 }
    ],
    testData: [
      { id: 1, description: 'Test data set 1', score: 1 },
      { id: 2, description: 'Test data set 2', score: 1 }
    ]
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

  const handleTestCaseChange = (index: number, field: keyof TestCase, value: any) => {
    setQuestion(prev => ({
      ...prev,
      testCases: prev.testCases.map((testCase, i) =>
        i === index ? { ...testCase, [field]: value } : testCase
      )
    }));
  };

  const handleTestDataChange = (index: number, field: keyof TestData, value: any) => {
    setQuestion(prev => ({
      ...prev,
      testData: prev.testData.map((testData, i) =>
        i === index ? { ...testData, [field]: value } : testData
      )
    }));
  };

  const handleAddTestCase = () => {
    setQuestion(prev => ({
      ...prev,
      testCases: [
        ...prev.testCases,
        {
          id: Date.now(),
          description: `Test case ${prev.testCases.length + 1}`,
          score: 1
        }
      ]
    }));
  };

  const handleAddTestData = () => {
    setQuestion(prev => ({
      ...prev,
      testData: [
        ...prev.testData,
        {
          id: Date.now(),
          description: `Test data set ${prev.testData.length + 1}`,
          score: 1
        }
      ]
    }));
  };

  const handleRemoveTestCase = (index: number) => {
    setQuestion(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveTestData = (index: number) => {
    setQuestion(prev => ({
      ...prev,
      testData: prev.testData.filter((_, i) => i !== index)
    }));
  };

  const handleSaveQuestion = async (questionToSave: Question) => {
    try {
      const savedQuestion = await questionService.saveQuestion(questionToSave);
      setQuestion(savedQuestion);
      toast({
        title: "Question Saved",
        description: "The question was successfully saved.",
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
            onTestCaseChange={handleTestCaseChange}
            onTestDataChange={handleTestDataChange}
            onAddTestCase={handleAddTestCase}
            onAddTestData={handleAddTestData}
            onRemoveTestCase={handleRemoveTestCase}
            onRemoveTestData={handleRemoveTestData}
            onSave={handleSaveQuestion}
            onUpdate={handleUpdateQuestion}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default QuestionCreatorPage;