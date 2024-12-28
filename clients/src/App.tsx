import React from 'react';
import { Box, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";

const App: React.FC = () => {
  return (
    <Box minH="100vh" bg="#0f0a19" py={8}>
      <Container maxW="container.xl">
        <Header />
        <CodeEditor />
      </Container>
    </Box>
  );
};

export default App;