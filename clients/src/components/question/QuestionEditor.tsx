import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import type { editor } from 'monaco-editor';
import { Question } from "../../types/questions";
import EditorPane from "../editor/EditorPane";
import Output from "../output/Output";
import QuestionHeader from "./QuestionHeader";

interface QuestionEditorProps {
  question: Question;
}

const QuestionEditor = ({ question }: QuestionEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [errorLine, setErrorLine] = useState<number | undefined>();

  return (
    <Box p={6} bg="#1a1625" borderRadius="md">
      <QuestionHeader question={question} />
      <Box mb={4}>
        <EditorPane
          value={question.defaultCode}
          errorLine={errorLine}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </Box>
      <Output 
        editorRef={editorRef} 
        language="python"
        questionId={question.id}
        onError={setErrorLine}
      />
    </Box>
  );
};

export default QuestionEditor;