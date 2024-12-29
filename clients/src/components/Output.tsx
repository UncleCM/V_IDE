import { useState } from "react";
import { Box, Button, Text, useToast, HStack } from "@chakra-ui/react";
import { editor } from 'monaco-editor';
import { executeCode } from "../api";
import { submitCode } from "../api/codeApi";
import { LoadCodeButton } from "./code-history/LoadCodeButton";

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor>;
  language: string;
  questionId: number;
  onError?: (line?: number) => void;
}

const Output = ({ editorRef, language, questionId, onError }: OutputProps) => {
  const toast = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
      
      // Convert output to string array, handling both string and null cases
      const outputLines = result.output ? result.output.split("\n") : [];
      setOutput(outputLines);
      
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

  const handleSubmit = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsSubmitting(true);
      
      // Prepare submission data with serializable output
      const submissionData = {
        code: sourceCode,
        language,
        question_id: questionId,
        output: output ? output.join('\n') : null,
        error: isError ? output ? output.join('\n') : null : null,
      };

      await submitCode(submissionData);
      
      toast({
        title: "Code submitted successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to submit code",
        description: "Please try again later",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadCode = (code: string) => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  };

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Button
          variant="outline"
          colorScheme="green"
          isLoading={isLoading}
          onClick={runCode}
        >
          Run Code
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          isLoading={isSubmitting}
          onClick={handleSubmit}
        >
          Submit Solution
        </Button>
        <LoadCodeButton 
          questionId={questionId}
          onLoadCode={handleLoadCode}
        />
      </HStack>
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