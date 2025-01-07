import { Box, Container } from "@chakra-ui/react";
import Header from "../components/Header";
import CodeEditor from "../components/CodeEditor";

const CodeEditorPage = () => {
  return (
    <Box minH="100vh" bg="#0f0a19">
      <Container maxW="container.xl" py={8}>
        <Header />
        <CodeEditor />
      </Container>
    </Box>
  );
};

export default CodeEditorPage;