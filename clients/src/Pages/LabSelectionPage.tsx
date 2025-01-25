import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, VStack, Text, HStack, Badge, Icon, Button, Spinner, useToast } from '@chakra-ui/react';
import { Book, ChevronRight, ScrollText, Timer, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { getLabsByCourseId, getCourseById, type Lab, type Course } from '../api/courseApi';

const MotionBox = motion.create(Box);

const getStatusColor = (status: Lab['status']) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'In Progress':
      return 'orange';
    case 'Not Started':
    default:
      return 'gray';
  }
};



const LabSelectionPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!courseId) {
        toast({
          title: 'Error',
          description: 'No course ID provided',
          status: 'error',
          duration: 5000,
        });
        return;
      }
  
      try {
        setIsLoading(true);
        const courseData = await getCourseById(courseId);
        const labsData = await getLabsByCourseId(courseData.subject_id);
        
        setCourse(courseData);
        setLabs(labsData);
      } catch (error) {
        toast({
          title: 'Error loading data',
          description: error instanceof Error ? error.message : 'Failed to load course data',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
  }, [courseId, toast]);

  const handleLabClick = (lab: Lab) => {
    setSelectedLab(lab);
    navigate(`/CodeEditor/${courseId}/${lab.id}`);
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="brand.bg.primary" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="brand.accent.primary" />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box minH="100vh" bg="brand.bg.primary" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <AlertCircle size={48} color="var(--chakra-colors-brand-accent-error)" />
          <Text color="brand.text.primary">Course not found</Text>
        </VStack>
      </Box>
    );
  }

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
              {course.name} Labs
            </Text>
            <VStack spacing={2} align="stretch">
              {labs.map((lab, index) => (
                <MotionBox
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Box
                    p={4}
                    bg={selectedLab?.id === lab.id ? 'brand.bg.active' : 'brand.bg.primary'}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handleLabClick(lab)}
                    _hover={{ bg: 'brand.bg.hover' }}
                    border="1px"
                    borderColor="brand.border.light"
                    transition="all 0.2s"
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
                </MotionBox>
              ))}

              {labs.length === 0 && (
                <Box 
                  p={4} 
                  bg="brand.bg.primary" 
                  borderRadius="lg"
                  border="1px"
                  borderColor="brand.border.light"
                >
                  <Text color="brand.text.secondary" textAlign="center">
                    No labs available for this course
                  </Text>
                </Box>
              )}
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
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
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

                  {selectedLab.description && (
                    <Box
                      p={4}
                      bg="brand.bg.primary"
                      borderRadius="lg"
                      border="1px"
                      borderColor="brand.border.light"
                    >
                      <Text color="brand.text.secondary" whiteSpace="pre-wrap">
                        {selectedLab.description}
                      </Text>
                    </Box>
                  )}

                  <Box pt={4}>
                    <Button
                      colorScheme="purple"
                      size="lg"
                      width="full"
                      onClick={() => handleLabClick(selectedLab)}
                    >
                      Start Lab
                    </Button>
                  </Box>
                </VStack>
              </MotionBox>
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