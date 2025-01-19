import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid, GridItem, VStack, Text, HStack, Button, Link, Spinner, useToast } from '@chakra-ui/react';
import { Book, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import CodeEditor from '../components/editor/CodeEditor';
import QuestionList from '../components/question/QuestionList';
import QuestionHeader from '../components/question/QuestionHeader';
import Header from '../components/Header';
import { questions } from '../data/questions';
import type { Question } from '../types/questions';
import { getCourses, getLabsByCourseId, type Lab, type Course } from '../api/courseApi';

const MotionBox = motion(Box);

const CodingPage = () => {
  const { courseId, labId } = useParams<{ courseId: string; labId: string }>();
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [lab, setLab] = useState<Lab | null>(null);
  const toast = useToast();

  // Learning resources mapping
  const learningResources: Record<string, string> = {
    python: "https://docs.python.org/3/tutorial/",
    javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    typescript: "https://www.typescriptlang.org/docs/",
    rust: "https://doc.rust-lang.org/book/",
    cpp: "https://www.learncpp.com/"
  };

  useEffect(() => {
    const loadLabData = async () => {
      if (!courseId || !labId) {
        toast({
          title: 'Error',
          description: 'Missing course or lab ID',
          status: 'error',
          duration: 5000,
        });
        return;
      }

      try {
        setIsLoading(true);
        // Load course and lab data
        const [courses, labs] = await Promise.all([
          getCourses(),
          getLabsByCourseId(courseId)
        ]);

        const currentCourse = courses.find(c => c.id === parseInt(courseId));
        const currentLab = labs.find(l => l.id === parseInt(labId));

        if (!currentCourse) {
          throw new Error('Course not found');
        }

        if (!currentLab) {
          throw new Error('Lab not found');
        }

        setCourse(currentCourse);
        setLab(currentLab);

        // Here you would typically load the questions for this specific lab
        // For now, we're using the mock questions
        setSelectedQuestion(questions[0]);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load lab data',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadLabData();
  }, [courseId, labId, toast]);

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="brand.bg.primary" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="brand.accent.primary" />
      </Box>
    );
  }

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
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VStack 
                bg="brand.bg.secondary"
                p={4}
                borderRadius="lg"
                height="100%"
                overflowY="auto"
                spacing={4}
                align="stretch"
                border="1px"
                borderColor="brand.border.light"
              >
                <HStack justify="space-between" align="center">
                  <Text fontSize="xl" fontWeight="bold" color="brand.text.primary">
                    {lab?.title || 'Lab Questions'}
                  </Text>
                  <Button
                    leftIcon={<ArrowLeft size={16} />}
                    variant="ghost"
                    size="sm"
                    onClick={() => window.history.back()}
                  >
                    Back
                  </Button>
                </HStack>
                <QuestionList onSelectQuestion={handleQuestionSelect} />
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Right Side - Question Details, Editor and Output */}
          <GridItem overflowY="auto">
            <VStack 
              spacing={4}
              height="100%"
              align="stretch"
            >
              {/* Question Details */}
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Box 
                  bg="brand.bg.secondary" 
                  p={4} 
                  borderRadius="lg"
                  border="1px"
                  borderColor="brand.border.light"
                >
                  <QuestionHeader question={selectedQuestion} />
                </Box>
              </MotionBox>

              {/* IDE Section */}
              <MotionBox
                flex={1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Box 
                  bg="brand.bg.secondary" 
                  p={4} 
                  borderRadius="lg"
                  minH="500px"
                  display="flex"
                  flexDirection="column"
                  border="1px"
                  borderColor="brand.border.light"
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
              </MotionBox>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CodingPage;