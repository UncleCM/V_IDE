import { Box, Container } from '@chakra-ui/react';
import CodeEditor from '../components/CodeEditor';
import Header from '../components/Header';

const CodingPage = () => {
  return (
    <Box minH="100vh" bg="brand.bg">
      <Container maxW="container.xl" py={8}>
        <Header />
        <CodeEditor />
      </Container>
    </Box>
  );
};

export default CodingPage;