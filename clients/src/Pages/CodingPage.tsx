import { useState } from 'react';
import { Box, Container, Grid, GridItem, VStack, Text } from '@chakra-ui/react';
import CodeEditor from '../components/editor/CodeEditor';
import QuestionList from '../components/question/QuestionList';
import QuestionHeader from '../components/question/QuestionHeader';
import Header from '../components/Header';
import { questions } from '../data/questions';
import type { Question } from '../types/questions';

const CodingPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0]);

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
  };

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="container.xl" py={4} height="calc(100vh - 56px)">
        <Grid 
          templateColumns="300px 1fr" 
          gap={6}
          height="100%"
        >
          {/* Left Sidebar - Questions List */}
          <GridItem>
            <VStack 
              bg="brand.bg.secondary"
              p={4}
              borderRadius="lg"
              height="100%"
              overflowY="auto"
              spacing={4}
              align="stretch"
            >
              <Text fontSize="xl" fontWeight="bold" color="brand.text.primary">
                Lab Questions
              </Text>
              <QuestionList onSelectQuestion={handleQuestionSelect} />
            </VStack>
          </GridItem>

          {/* Right Side - Question Details, Editor and Output */}
          <GridItem overflowY="auto">
            <VStack 
              spacing={4}
              height="100%"
              align="stretch"
            >
              {/* Question Details */}
              <Box bg="brand.bg.secondary" p={4} borderRadius="lg">
                <QuestionHeader question={selectedQuestion} />
              </Box>

              {/* IDE Section */}
              <Box 
                flex={1} 
                bg="brand.bg.secondary" 
                p={4} 
                borderRadius="lg"
                minH="500px"
                display="flex"
                flexDirection="column"
              >
                <Text fontSize="lg" fontWeight="semibold" color="brand.text.primary" mb={4}>
                  IDE
                </Text>
                <Box flex={1}>
                  <CodeEditor 
                    key={selectedQuestion.id} // Force new instance on question change
                    initialCode={selectedQuestion.defaultCode} 
                    questionId={selectedQuestion.id} 
                  />
                </Box>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CodingPage;