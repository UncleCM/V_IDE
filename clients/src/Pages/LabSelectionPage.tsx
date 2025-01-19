import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, HStack, Badge, Spinner, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Award, Star, Clock, TrendingUp, Target, Activity } from 'lucide-react';
import Header from '../components/Header';
import { getLabsByCourseId, type Lab } from '../api/courseApi';
import { CodeExecutionResponse } from '../api/codeApi';

const MotionBox = motion(Box);

interface LabScore {
  labId: number;
  labTitle: string;
  questions: {
    id: number;
    title: string;
    score: number;
    attempts: number;
    timeSpent: string;
  }[];
  averageScore: number;
  totalTimeSpent: string;
}

const LabScorePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [labScores, setLabScores] = useState<LabScore[]>([]);
  const toast = useToast();

  useEffect(() => {
    const loadScores = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const mockScores: LabScore[] = [
          {
            labId: 1,
            labTitle: "Python Lab #1",
            questions: [
              { id: 1, title: "Factorial", score: 5, attempts: 2, timeSpent: "25m" },
              { id: 2, title: "Fibonacci", score: 4, attempts: 3, timeSpent: "35m" }
            ],
            averageScore: 4.5,
            totalTimeSpent: "1h"
          },
          {
            labId: 2,
            labTitle: "Python Lab #2",
            questions: [
              { id: 3, title: "Binary Search", score: 3, attempts: 4, timeSpent: "45m" },
              { id: 4, title: "Quick Sort", score: 5, attempts: 1, timeSpent: "30m" }
            ],
            averageScore: 4,
            totalTimeSpent: "1h 15m"
          }
        ];
        setLabScores(mockScores);
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
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="300px 1fr" gap={6}>
          {/* Left Sidebar - Summary */}
          <VStack spacing={4} align="stretch">
            {/* Profile Summary */}
            <MotionBox
              bg="brand.bg.secondary"
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor="brand.border.light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VStack spacing={6} align="stretch">
                <HStack spacing={4}>
                  <Box
                    p={3}
                    bg="brand.bg.primary"
                    borderRadius="lg"
                    color="brand.accent.success"
                  >
                    <Award size={24} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text color="brand.text.secondary" fontSize="sm">Overall Score</Text>
                    <Text color="brand.text.primary" fontSize="2xl" fontWeight="bold">
                      4.25/5.0
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={4}>
                  <Box
                    p={3}
                    bg="brand.bg.primary"
                    borderRadius="lg"
                    color="brand.accent.warning"
                  >
                    <Clock size={24} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text color="brand.text.secondary" fontSize="sm">Total Time</Text>
                    <Text color="brand.text.primary" fontSize="2xl" fontWeight="bold">
                      2h 15m
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </MotionBox>

            {/* Performance Metrics */}
            <MotionBox
              bg="brand.bg.secondary"
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor="brand.border.light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <VStack spacing={6} align="stretch">
                <Text fontSize="lg" fontWeight="bold" color="brand.text.primary">
                  Performance Metrics
                </Text>

                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <HStack spacing={3}>
                      <TrendingUp size={16} color="var(--chakra-colors-brand-accent-success)" />
                      <Text color="brand.text.secondary">Success Rate</Text>
                    </HStack>
                    <Text color="brand.text.primary" fontWeight="bold">85%</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <HStack spacing={3}>
                      <Target size={16} color="var(--chakra-colors-brand-accent-primary)" />
                      <Text color="brand.text.secondary">Completion Rate</Text>
                    </HStack>
                    <Text color="brand.text.primary" fontWeight="bold">90%</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <HStack spacing={3}>
                      <Activity size={16} color="var(--chakra-colors-brand-accent-warning)" />
                      <Text color="brand.text.secondary">Avg. Attempts</Text>
                    </HStack>
                    <Text color="brand.text.primary" fontWeight="bold">2.5</Text>
                  </HStack>
                </VStack>
              </VStack>
            </MotionBox>
          </VStack>

          {/* Right Side - Detailed Scores */}
          <MotionBox
            bg="brand.bg.secondary"
            borderRadius="lg"
            border="1px"
            borderColor="brand.border.light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Lab</Th>
                  <Th>Question</Th>
                  <Th isNumeric>Score</Th>
                  <Th isNumeric>Attempts</Th>
                  <Th isNumeric>Time Spent</Th>
                </Tr>
              </Thead>
              <Tbody>
                {labScores.map((lab) => (
                  <React.Fragment key={lab.labId}>
                    {lab.questions.map((question, qIndex) => (
                      <Tr key={question.id}>
                        {qIndex === 0 && (
                          <Td rowSpan={lab.questions.length}>
                            <VStack align="start" spacing={2}>
                              <Text fontWeight="medium">{lab.labTitle}</Text>
                              <HStack>
                                <Text fontSize="sm" color="brand.text.secondary">Avg:</Text>
                                <Badge colorScheme={getScoreColor(lab.averageScore)}>
                                  {lab.averageScore.toFixed(1)}/5
                                </Badge>
                              </HStack>
                              <Text fontSize="sm" color="brand.text.secondary">
                                Total: {lab.totalTimeSpent}
                              </Text>
                            </VStack>
                          </Td>
                        )}
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
                  </React.Fragment>
                ))}
              </Tbody>
            </Table>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
};

export default LabScorePage;