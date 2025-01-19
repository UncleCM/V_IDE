import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, HStack, Badge, Spinner, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Header from '../components/Header';
import LabScoreSidebar from '../components/lab-score/LabScoreSidebar';

const MotionBox = motion(Box);

interface Question {
  id: number;
  title: string;
  score: number;
  attempts: number;
  timeSpent: string;
}

interface Lab {
  id: number;
  title: string;
  questions: Question[];
  averageScore: number;
  totalTimeSpent: string;
}

const LabScorePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [selectedLabId, setSelectedLabId] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    const loadScores = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const mockLabs: Lab[] = [
          {
            id: 1,
            title: "Python Lab #1",
            questions: [
              { id: 1, title: "Factorial", score: 5, attempts: 2, timeSpent: "25m" },
              { id: 2, title: "Fibonacci", score: 4, attempts: 3, timeSpent: "35m" }
            ],
            averageScore: 4.5,
            totalTimeSpent: "1h"
          },
          {
            id: 2,
            title: "Python Lab #2",
            questions: [
              { id: 3, title: "Binary Search", score: 3, attempts: 4, timeSpent: "45m" },
              { id: 4, title: "Quick Sort", score: 5, attempts: 1, timeSpent: "30m" }
            ],
            averageScore: 4,
            totalTimeSpent: "1h 15m"
          }
        ];
        setLabs(mockLabs);
        setSelectedLabId(mockLabs[0].id);
      } catch (error) {
        toast({
          title: 'Error loading scores',
          description: error instanceof Error ? error.message : 'Failed to load lab scores',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadScores();
  }, [toast]);

  const getScoreColor = (score: number) => {
    if (score >= 4) return "green";
    if (score >= 3) return "yellow";
    return "red";
  };

  // Calculate overall metrics
  const calculateOverallMetrics = () => {
    const allQuestions = labs.flatMap(lab => lab.questions);
    const totalQuestions = allQuestions.length;
    const completedQuestions = allQuestions.filter(q => q.score > 0).length;
    const totalAttempts = allQuestions.reduce((sum, q) => sum + q.attempts, 0);
    const successfulQuestions = allQuestions.filter(q => q.score >= 4).length;
    const totalScore = allQuestions.reduce((sum, q) => sum + q.score, 0) / totalQuestions;

    return {
      totalScore,
      totalTime: labs.reduce((sum, lab) => sum + lab.totalTimeSpent, ""),
      successRate: Math.round((successfulQuestions / totalQuestions) * 100),
      completionRate: Math.round((completedQuestions / totalQuestions) * 100),
      averageAttempts: Number((totalAttempts / totalQuestions).toFixed(1))
    };
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="brand.bg.primary" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="brand.accent.primary" />
      </Box>
    );
  }

  const selectedLab = labs.find(lab => lab.id === selectedLabId);
  const overallMetrics = calculateOverallMetrics();

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="300px 1fr" gap={6} height="calc(100vh - 200px)">
          {/* Left Sidebar */}
          <Box 
            bg="brand.bg.secondary"
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor="brand.border.light"
            height="100%"
            overflowY="auto"
          >
            <LabScoreSidebar
              labs={labs}
              selectedLabId={selectedLabId}
              onLabSelect={(lab) => setSelectedLabId(lab.id)}
              overallMetrics={overallMetrics}
            />
          </Box>

          {/* Right Side - Selected Lab Details */}
          {selectedLab && (
            <MotionBox
              bg="brand.bg.secondary"
              borderRadius="lg"
              border="1px"
              borderColor="brand.border.light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              height="100%"
              overflowY="auto"
            >
              <VStack spacing={4} p={6} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="2xl" fontWeight="bold" color="brand.text.primary">
                    {selectedLab.title}
                  </Text>
                  <Badge 
                    colorScheme={getScoreColor(selectedLab.averageScore)}
                    p={2}
                    borderRadius="md"
                  >
                    Average: {selectedLab.averageScore.toFixed(1)}/5
                  </Badge>
                </HStack>

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Question</Th>
                      <Th isNumeric>Score</Th>
                      <Th isNumeric>Attempts</Th>
                      <Th isNumeric>Time Spent</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedLab.questions.map((question) => (
                      <Tr key={question.id}>
                        <Td>{question.title}</Td>
                        <Td isNumeric>
                          <HStack justify="flex-end" spacing={1}>
                            <Star size={16} color={`var(--chakra-colors-${getScoreColor(question.score)}-500)`} />
                            <Text>{question.score}/5</Text>
                          </HStack>
                        </Td>
                        <Td isNumeric>{question.attempts}</Td>
                        <Td isNumeric>{question.timeSpent}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </MotionBox>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default LabScorePage;