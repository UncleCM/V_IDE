import React from 'react';
import { VStack, HStack, Box, Text, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Book, ChevronRight, Award, Clock, TrendingUp, Target, Activity } from 'lucide-react';

const MotionBox = motion(Box);

interface Lab {
  id: number;
  title: string;
  questions: {
    id: number;
    title: string;
    score: number;
  }[];
}

interface LabScoreSidebarProps {
  labs: Lab[];
  selectedLabId: number | null;
  onLabSelect: (lab: Lab) => void;
  overallMetrics: {
    totalScore: number;
    totalTime: string;
    successRate: number;
    completionRate: number;
    averageAttempts: number;
  };
}

const LabScoreSidebar = ({ labs, selectedLabId, onLabSelect, overallMetrics }: LabScoreSidebarProps) => {
  return (
    <VStack spacing={4} align="stretch" height="100%">
      {/* Lab List */}
      <Box flex="1" overflowY="auto">
        <Text fontSize="lg" fontWeight="bold" color="brand.text.primary" mb={4}>
          Lab Scores
        </Text>
        <VStack spacing={2} align="stretch">
          {labs.map((lab) => (
            <Box
              key={lab.id}
              p={4}
              bg={selectedLabId === lab.id ? 'brand.bg.active' : 'brand.bg.primary'}
              borderRadius="lg"
              cursor="pointer"
              onClick={() => onLabSelect(lab)}
              _hover={{ bg: 'brand.bg.hover' }}
              border="1px"
              borderColor="brand.border.light"
              transition="all 0.2s"
            >
              <HStack justify="space-between">
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Book size={16} color="var(--chakra-colors-brand-accent-primary)" />
                    <Text color="brand.text.primary" fontWeight="medium">
                      {lab.title}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="brand.text.secondary">
                    {lab.questions.length} Questions
                  </Text>
                </VStack>
                <ChevronRight color="var(--chakra-colors-brand-text-secondary)" />
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

      <Divider borderColor="brand.border.light" />

      {/* Summary Section */}
      <Box p={4} bg="brand.bg.primary" borderRadius="lg" border="1px" borderColor="brand.border.light">
        <Text fontSize="lg" fontWeight="bold" color="brand.text.primary" mb={4}>
          Overall Summary
        </Text>
        
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Award size={16} color="var(--chakra-colors-brand-accent-success)" />
              <Text color="brand.text.secondary">Total Score</Text>
            </HStack>
            <Text color="brand.text.primary" fontWeight="bold">
              {overallMetrics.totalScore.toFixed(2)}/5.0
            </Text>
          </HStack>

          <HStack justify="space-between">
            <HStack spacing={3}>
              <Clock size={16} color="var(--chakra-colors-brand-accent-warning)" />
              <Text color="brand.text.secondary">Total Time</Text>
            </HStack>
            <Text color="brand.text.primary" fontWeight="bold">
              {overallMetrics.totalTime}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <HStack spacing={3}>
              <TrendingUp size={16} color="var(--chakra-colors-brand-accent-primary)" />
              <Text color="brand.text.secondary">Success Rate</Text>
            </HStack>
            <Text color="brand.text.primary" fontWeight="bold">
              {overallMetrics.successRate}%
            </Text>
          </HStack>

          <HStack justify="space-between">
            <HStack spacing={3}>
              <Target size={16} color="var(--chakra-colors-brand-accent-info)" />
              <Text color="brand.text.secondary">Completion</Text>
            </HStack>
            <Text color="brand.text.primary" fontWeight="bold">
              {overallMetrics.completionRate}%
            </Text>
          </HStack>

          <HStack justify="space-between">
            <HStack spacing={3}>
              <Activity size={16} color="var(--chakra-colors-brand-accent-warning)" />
              <Text color="brand.text.secondary">Avg. Attempts</Text>
            </HStack>
            <Text color="brand.text.primary" fontWeight="bold">
              {overallMetrics.averageAttempts}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default LabScoreSidebar;