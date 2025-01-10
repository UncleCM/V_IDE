import { useState } from "react";
import { Box, Button, Text, useToast, HStack, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { editor } from 'monaco-editor';
import { executeCode } from "../../api";
import { saveCode, saveCodeAs, setExecutionScore } from "../../api/codeApi";
import { LoadCodeButton } from "../code-history/LoadCodeButton";
import { Save, SaveAll, Star } from "lucide-react";

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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentExecutionId, setCurrentExecutionId] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);

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

  const handleSave = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsSaving(true);
      
      const submissionData = {
        code: sourceCode,
        language,
        question_id: questionId,
        output: output ? output.join('\n') : null,
        error: isError ? output ? output.join('\n') : null : null,
      };

      const response = await saveCode(submissionData);
      setCurrentExecutionId(response.id);
      setScore(response.score);
      
      toast({
        title: "Code saved successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to save code",
        description: "Please try again later",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAs = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsSaving(true);
      
      const submissionData = {
        code: sourceCode,
        language,
        question_id: questionId,
        output: output ? output.join('\n') : null,
        error: isError ? output ? output.join('\n') : null : null,
      };

      const response = await saveCodeAs(submissionData);
      setCurrentExecutionId(response.id);
      setScore(response.score);
      
      toast({
        title: "Code saved successfully",
        description: `Saved as version ${response.version}`,
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to save code",
        description: "Please try again later",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadCode = (code: string, executionId: number, score: number) => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
      setCurrentExecutionId(executionId);
      setScore(score);
    }
  };

  const handleSetScore = async (newScore: number) => {
    if (!currentExecutionId) {
      toast({
        title: "Please save your code first",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await setExecutionScore(currentExecutionId, newScore);
      setScore(response.score);
      
      toast({
        title: "Score updated",
        description: `Score set to ${response.score}/5`,
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to update score",
        description: "Please try again later",
        status: "error",
        duration: 6000,
      });
    }
  };

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Button
          leftIcon={<Save size={16} />}
          colorScheme="blue"
          isLoading={isSaving}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          leftIcon={<SaveAll size={16} />}
          variant="outline"
          colorScheme="blue"
          onClick={handleSaveAs}
        >
          Save As
        </Button>
        <Button
          variant="outline"
          colorScheme="green"
          isLoading={isLoading}
          onClick={runCode}
        >
          Run Code
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<Star size={16} />}
            variant={score > 0 ? "solid" : "outline"}
            colorScheme="purple"
            isDisabled={!currentExecutionId}
          >
            {score > 0 ? `${score}/5` : "Score"}
          </MenuButton>
          <MenuList bg="#110c1b">
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <MenuItem
                key={value}
                onClick={() => handleSetScore(value)}
                bg={score === value ? "#1a1625" : undefined}
                _hover={{ bg: '#1a1625' }}
              >
                {value === 0 ? "No Score" : `${value}/5`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
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