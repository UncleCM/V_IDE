import { useState } from "react";
import { executeCode } from "../api";

export function useCodeExecution() {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const execute = async (language: string, sourceCode: string) => {
    if (!sourceCode) return;
    
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setOutput(["An error occurred while executing the code"]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    output,
    isLoading,
    isError,
  };
}