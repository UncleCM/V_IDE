import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme.ts'
import { QuestionProgressProvider } from './contexts/QuestionProgressContext';

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <QuestionProgressProvider>
          <App />
        </QuestionProgressProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}