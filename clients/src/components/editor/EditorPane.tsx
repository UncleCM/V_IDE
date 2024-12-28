import { Editor } from "@monaco-editor/react";
import type { editor } from 'monaco-editor';

interface EditorPaneProps {
  value: string;
  onChange?: (value: string) => void;
  onMount: (editor: editor.IStandaloneCodeEditor) => void;
  errorLine?: number;
}

const EditorPane = ({ value, onChange, onMount, errorLine }: EditorPaneProps) => {
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    onMount(editor);
    if (errorLine !== undefined) {
      editor.deltaDecorations([], [{
        range: new monaco.Range(errorLine, 1, errorLine, 1),
        options: {
          isWholeLine: true,
          className: 'errorLineDecoration',
          glyphMarginClassName: 'errorGlyphMargin',
          linesDecorationsClassName: 'errorLineDecoration'
        }
      }]);
    }
  };

  return (
    <Editor
      height="300px"
      theme="vs-dark"
      language="python"
      value={value}
      onChange={(value) => onChange?.(value ?? "")}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        glyphMargin: true,
      }}
    />
  );
};

export default EditorPane;