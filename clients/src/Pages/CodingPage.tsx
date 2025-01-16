import { useState } from 'react';
import { Box, Container, Grid, GridItem, VStack, Text, HStack, Button, Link } from '@chakra-ui/react';
import { Book } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import QuestionList from '../components/question/QuestionList';
import QuestionHeader from '../components/question/QuestionHeader';
import Header from '../components/Header';
import { questions } from '../data/questions';
import type { Question } from '../types/questions';

const CodingPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0]);

  // Learning resources mapping
  const learningResources: Record<string, string> = {
    python: "https://docs.python.org/3/tutorial/",
    javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    typescript: "https://www.typescriptlang.org/docs/",
    rust: "https://doc.rust-lang.org/book/",
    cpp: "https://www.learncpp.com/"
  };

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
                <HStack justify="space-between" align="center" mb={4}>
                  <Text fontSize="lg" fontWeight="semibold" color="brand.text.primary">
                    IDE
                  </Text>
                  <Link 
                    href={learningResources[selectedQuestion.language]} 
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Button
                      leftIcon={<Book size={16} />}
                      variant="outline"
                      size="sm"
                      colorScheme="purple"
                    >
                      Learn {selectedQuestion.language}
                    </Button>
                  </Link>
                </HStack>
                <Box flex={1}>
                  <CodeEditor 
                    key={selectedQuestion.id}
                    initialCode={selectedQuestion.defaultCode} 
                    questionId={selectedQuestion.id}
                    language={selectedQuestion.language}
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