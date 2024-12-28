import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { editor } from 'monaco-editor';
import { executeCode } from "../api";

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor>;
  language: string;
}

interface ExecuteCodeResponse {
  run: {
    output: string;
    stderr: string;
  };
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode) as ExecuteCodeResponse;
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error instanceof Error ? error.message : "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;