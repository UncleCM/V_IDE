import React, { useState } from 'react';
import { Box, Container, Grid, VStack, Text, HStack, Badge, Icon } from '@chakra-ui/react';
import { Book, ChevronRight, ScrollText, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface Lab {
  id: number;
  title: string;
  topic: string;
  questions: number;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

const mockLabs: Lab[] = [
  {
    id: 1,
    title: 'Python Lab #1',
    topic: 'Iteration',
    questions: 3,
    duration: '1 hour',
    status: 'Not Started'
  },
  {
    id: 2,
    title: 'Python Lab #2',
    topic: 'Functions',
    questions: 4,
    duration: '1.5 hours',
    status: 'In Progress'
  },
  {
    id: 3,
    title: 'Python Lab #3',
    topic: 'Data Structures',
    questions: 5,
    duration: '2 hours',
    status: 'Completed'
  }
];

const getStatusColor = (status: Lab['status']) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'In Progress':
      return 'orange';
    case 'Not Started':
      return 'gray';
    default:
      return 'gray';
  }
};

const LabSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const handleLabClick = (lab: Lab) => {
    setSelectedLab(lab);
    navigate('/CodeEditor');
  };

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns="300px 1fr" gap={6}>
          {/* Left Sidebar - Lab List */}
          <VStack 
            spacing={4} 
            align="stretch"
            bg="brand.bg.secondary"
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor="brand.border.light"
          >
            <Text fontSize="lg" fontWeight="bold" color="brand.text.primary">
              Python Lab
            </Text>
            <VStack spacing={2} align="stretch">
              {mockLabs.map((lab) => (
                <Box
                  key={lab.id}
                  p={4}
                  bg={selectedLab?.id === lab.id ? 'brand.bg.active' : 'brand.bg.primary'}
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => handleLabClick(lab)}
                  _hover={{ bg: 'brand.bg.hover' }}
                  border="1px"
                  borderColor="brand.border.light"
                >
                  <HStack justify="space-between">
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Icon as={Book} color="brand.accent.primary" />
                        <Text color="brand.text.primary" fontWeight="medium">
                          {lab.title}
                        </Text>
                      </HStack>
                      <Badge colorScheme={getStatusColor(lab.status)}>
                        {lab.status}
                      </Badge>
                    </VStack>
                    <ChevronRight color="var(--chakra-colors-brand-text-secondary)" />
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>

          {/* Right Side - Lab Details */}
          <Box
            bg="brand.bg.secondary"
            p={6}
            borderRadius="lg"
            border="1px"
            borderColor="brand.border.light"
          >
            {selectedLab ? (
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.text.primary">
                      {selectedLab.title}
                    </Text>
                    <Text color="brand.text.secondary">
                      {selectedLab.topic}
                    </Text>
                  </VStack>
                  <Badge 
                    colorScheme={getStatusColor(selectedLab.status)}
                    p={2}
                    borderRadius="md"
                  >
                    {selectedLab.status}
                  </Badge>
                </HStack>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <HStack 
                    p={4} 
                    bg="brand.bg.primary" 
                    borderRadius="lg"
                    border="1px"
                    borderColor="brand.border.light"
                  >
                    <ScrollText size={20} color="var(--chakra-colors-brand-accent-primary)" />
                    <VStack align="start" spacing={0}>
                      <Text color="brand.text.secondary" fontSize="sm">Questions</Text>
                      <Text color="brand.text.primary" fontWeight="bold">{selectedLab.questions}</Text>
                    </VStack>
                  </HStack>

                  <HStack 
                    p={4} 
                    bg="brand.bg.primary" 
                    borderRadius="lg"
                    border="1px"
                    borderColor="brand.border.light"
                  >
                    <Timer size={20} color="var(--chakra-colors-brand-accent-primary)" />
                    <VStack align="start" spacing={0}>
                      <Text color="brand.text.secondary" fontSize="sm">Duration</Text>
                      <Text color="brand.text.primary" fontWeight="bold">{selectedLab.duration}</Text>
                    </VStack>
                  </HStack>
                </Grid>

                {/* Add more lab details and instructions here */}
              </VStack>
            ) : (
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minH="300px"
                color="brand.text.secondary"
              >
                Select a lab from the list to view details
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default LabSelectionPage;