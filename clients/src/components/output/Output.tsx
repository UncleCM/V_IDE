import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { editor } from 'monaco-editor';
import { executeCode } from "../../api";

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor>;
  language: string;
  onError?: (line?: number) => void;
}

const Output = ({ editorRef, language, onError }: OutputProps) => {
  const toast = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getErrorLine = (error: string): number | undefined => {
    const match = error.match(/line (\d+)/);
    return match ? parseInt(match[1], 10) : undefined;
  };

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      
      if (result.stderr) {
        setIsError(true);
        const errorLine = getErrorLine(result.stderr);
        onError?.(errorLine);
      } else {
        setIsError(false);
        onError?.(undefined);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
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
    <Box>
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
        p={4}
        bg="#110c1b"
        borderRadius="md"
        minH="200px"
        color={isError ? "red.400" : "white"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : <Text color="gray.400">Click "Run Code" to see the output here</Text>}
      </Box>
    </Box>
  );
};

export default Output;