import { useState } from "react";
import { Box, Button, Text, useToast, HStack, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { editor } from 'monaco-editor';
import { executePistonCode } from "../../api/pistonApi";
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

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    
    try {
      setIsLoading(true);
      const result = await executePistonCode(language, sourceCode);
      
      // Combine stdout and stderr for output
      const outputText = result.run.stderr ? result.run.stderr : result.run.stdout;
      setOutput(outputText.split("\n"));
      setIsError(!!result.run.stderr);

      if (result.run.stderr && onError) {
        // Try to extract line number from error message
        const lineMatch = result.run.stderr.match(/line (\d+)/);
        onError(lineMatch ? parseInt(lineMatch[1]) : undefined);
      } else if (onError) {
        onError(undefined);
      }
    } catch (error) {
      console.error(error);
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
    const code = editorRef.current.getValue();
    try {
      setIsSaving(true);
      const response = await saveCode({
        code,
        language,
        question_id: questionId,
        output: output?.join("\n") || null,
        score
      });
      setCurrentExecutionId(response.id);
      toast({
        title: "Code saved successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to save code",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAs = async () => {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();
    try {
      setIsSaving(true);
      const response = await saveCodeAs({
        code,
        language,
        question_id: questionId,
        output: output?.join("\n") || null,
        score
      });
      setCurrentExecutionId(response.id);
      toast({
        title: "New version saved successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to save new version",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetScore = async (newScore: number) => {
    if (!currentExecutionId) return;
    try {
      const response = await setExecutionScore(currentExecutionId, newScore);
      setScore(response.score);
      toast({
        title: "Score updated successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to update score",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleLoadCode = (code: string, executionId: number, savedScore: number) => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
      setCurrentExecutionId(executionId);
      setScore(savedScore);
    }
  };

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Button
          leftIcon={<Save size={16} />}
          colorScheme="purple"
          isLoading={isSaving}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          leftIcon={<SaveAll size={16} />}
          variant="outline"
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
            isDisabled={!currentExecutionId}
          >
            {score > 0 ? `${score}/5` : "Score"}
          </MenuButton>
          <MenuList>
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <MenuItem
                key={value}
                onClick={() => handleSetScore(value)}
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
        bg="#1e1e1e"
        borderRadius="md"
        minH="200px"
        color={isError ? "brand.accent.error" : "#d4d4d4"}
        fontFamily="Monaco, Consolas, 'Courier New', monospace"
        whiteSpace="pre-wrap"
        overflowX="auto"
      >
        {output ? (
          output.map((line, i) => (
            <Text key={i} color={isError ? "brand.accent.error" : "#d4d4d4"}>
              {line}
            </Text>
          ))
        ) : (
          <Text color="gray.500">Click "Run Code" to see the output here</Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;