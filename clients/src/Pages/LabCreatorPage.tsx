import { useState } from 'react';
import { Box, Container, Flex, useToast } from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import LabSidebar from '../components/sidebar/LabSidebar';
import LabForm from '../components/lab/LabForm';

interface Lab {
  id: number;
  labName: string;
  language: string;
  concept: string;
  tutorial: string;
  duration: string;
}

const LabCreatorPage = () => {
  const toast = useToast();
  const [lab, setLab] = useState<Lab>({
    id: 0,
    labName: '',
    language: '',
    concept: '',
    tutorial: '',
    duration: ''
  });

  const handleSaveLab = async (formData: Omit<Lab, "id">) => {
    // try {
    //   const savedLab = await saveLab({ ...formData, id: lab.id });
    //   setLab(savedLab);
    //   toast({
    //     title: "Success",
    //     description: "Lab saved successfully",
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to save lab",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
    console.log('Saving lab:', formData);
  };

  return (
    <Box minH="100vh">
      <Header />
      <Flex>
        <LabSidebar />
        <Container maxW="container.lg" py={6}>
          <LabForm 
            initialData={lab} 
            onSubmit={handleSaveLab}
          />
        </Container>
      </Flex>
    </Box>
  );
};

export default LabCreatorPage;