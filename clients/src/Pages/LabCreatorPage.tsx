import { useState } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Lab } from '../types/lab';
import Header from '../components/Layout/Header';
import LabSidebar from '../components/lab/LabSidebar';
import LabForm from '../components/lab/LabForm';

const labService = {
  saveLab: async (lab: Lab) => {
    console.log('Saving lab:', lab);
    return { ...lab, id: Date.now() };
  },
  updateLab: async (lab: Lab) => {
    console.log('Updating lab:', lab);
    return lab;
  }
};

const LabCreatorPage = () => {
  const [lab, setLab] = useState<Lab>({
    id: 0,
    name: 'Python Lab',
    number: '2',
    language: 'Python',
    duration: { hours: '3', minutes: '00' },
    tags: ['Expression', 'For Loop', 'Function'],
    tutorial: 'Tutorial for teaching programming concepts for each lab class.'
  });

  const handleLabChange = (field: keyof Lab, value: any) => {
    setLab(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDurationChange = (field: keyof Lab['duration'], value: string) => {
    setLab(prev => ({
      ...prev,
      duration: {
        ...prev.duration,
        [field]: value
      }
    }));
  };

  const handleSaveLab = async () => {
    try {
      const savedLab = await labService.saveLab(lab);
      setLab(savedLab);
    } catch (error) {
      console.error('Failed to save lab:', error);
    }
  };

  return (
    <Box minH="100vh" bg="brand.bg.primary">
      <Header />
      <Container maxW="7xl" py={4}>
        <Flex gap={4}>
          <LabSidebar />
          <LabForm
            lab={lab}
            onLabChange={handleLabChange}
            onDurationChange={handleDurationChange}
            onSave={handleSaveLab}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default LabCreatorPage;