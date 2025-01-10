import { useState } from "react";
import { Box, Button, Text, useToast, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, useDisclosure } from "@chakra-ui/react";
import { editor } from 'monaco-editor';
import { executeCode } from "../../api";
import { saveCode, saveCodeAs } from "../../api/codeApi";
import { LoadCodeButton } from "../code-history/LoadCodeButton";
import { Save, SaveAll } from "lucide-react";

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor>;
  language: string;
  questionId: number;
  onError?: (line?: number) => void;
}

const Output = ({ editorRef, language, questionId, onError }: OutputProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

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

      await saveCode(submissionData);
      
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
    if (!fileName.trim()) {
      toast({
        title: "Please enter a file name",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSaving(true);
      
      const submissionData = {
        code: editorRef.current?.getValue() || "",
        language,
        question_id: questionId,
        output: output ? output.join('\n') : null,
        error: isError ? output ? output.join('\n') : null : null,
        filename: fileName.trim()
      };

      await saveCodeAs(submissionData);
      
      toast({
        title: "Code saved successfully",
        description: `Saved as ${fileName}`,
        status: "success",
        duration: 3000,
      });
      onClose();
      setFileName("");
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

  const handleLoadCode = (code: string) => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
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
          onClick={onOpen}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a1625">
          <ModalHeader color="white">Save As</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="white">File Name</FormLabel>
              <Input
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                bg="#110c1b"
                border="none"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleSaveAs}
              isLoading={isSaving}
              width="full"
            >
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Output;