import { VStack, Box } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import type { editor } from 'monaco-editor';
import EditorPane from "./EditorPane";
import Output from "../output/Output";
import { SupportedLanguage } from "../../types/questions";

interface CodeEditorProps {
  initialCode?: string;
  questionId: number;
  language: SupportedLanguage;
}

const CodeEditor = ({ initialCode = "", questionId, language }: CodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>(initialCode);
  const [errorLine, setErrorLine] = useState<number | undefined>();

  // Reset state when question changes
  useEffect(() => {
    setValue(initialCode);
    setErrorLine(undefined);
  }, [initialCode, questionId]);

  const onMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <VStack height="100%" spacing={4}>
      {/* Editor */}
      <Box height="300px" width="100%" bg="brand.bg.primary" borderRadius="md" overflow="hidden">
        <EditorPane
          value={value}
          onChange={setValue}
          onMount={onMount}
          errorLine={errorLine}
          language={language}
        />
      </Box>

      {/* Output */}
      <Box width="100%">
        <Output 
          editorRef={editorRef}
          language={language}
          questionId={questionId}
          onError={setErrorLine}
        />
      </Box>
    </VStack>
  );
};

export default CodeEditor;