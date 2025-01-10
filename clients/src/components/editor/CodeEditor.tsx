import { useRef, useState } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import type { editor } from 'monaco-editor';
import QuestionList from "../question/QuestionList";
import EditorPane from "./EditorPane";
import Output from "../output/Output";

const CodeEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>("");
  const [errorLine, setErrorLine] = useState<number | undefined>();

  const onMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleError = (line?: number) => {
    setErrorLine(line);
  };

  return (
    <HStack spacing={8} align="flex-start">
      <Box w="300px">
        <QuestionList onSelectQuestion={setValue} />
      </Box>
      <VStack flex={1} spacing={4} align="stretch">
        <EditorPane
          value={value}
          onChange={setValue}
          onMount={onMount}
          errorLine={errorLine}
        />
        <Output 
          editorRef={editorRef} 
          language="python"
          questionId={1}
          onError={handleError}
        />
      </VStack>
    </HStack>
  );
};

export default CodeEditor;