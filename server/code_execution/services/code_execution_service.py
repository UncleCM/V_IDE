from ..models import CodeExecution
from .code_runner import CodeRunner

class CodeExecutionService:
    def __init__(self):
        self.code_runner = CodeRunner()

    def execute_code(self, code: str, language: str) -> tuple[str | None, str | None]:
        """Execute code and return output and error"""
        return self.code_runner.run_code(code, language)

    def create_execution(self, code: str, language: str, question_id: int) -> CodeExecution:
        """Create a new code execution record"""
        output, error = self.execute_code(code, language)
        
        return CodeExecution.objects.create(
            code=code,
            language=language,
            output=output,
            error=error,
            question_id=question_id
        )

    def get_question_executions(self, question_id: int):
        """Get all executions for a specific question"""
        return CodeExecution.objects.filter(question_id=question_id)