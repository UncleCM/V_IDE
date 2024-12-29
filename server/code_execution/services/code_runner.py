from typing import Optional, Dict
import subprocess
import tempfile
import os

class CodeRunner:
    LANGUAGE_CONFIGS: Dict[str, Dict] = {
        'python': {
            'extension': '.py',
            'command': 'python'
        },
        'javascript': {
            'extension': '.js',
            'command': 'node'
        }
    }

    def run_code(self, code: str, language: str) -> tuple[Optional[str], Optional[str]]:
        """
        Executes code in a safe environment and returns the output and error
        """
        if language not in self.LANGUAGE_CONFIGS:
            return None, f"Language {language} is not supported"

        config = self.LANGUAGE_CONFIGS[language]
        
        with tempfile.NamedTemporaryFile(
            suffix=config['extension'],
            mode='w',
            delete=False
        ) as temp_file:
            temp_file.write(code)
            temp_file.flush()

        try:
            result = subprocess.run(
                [config['command'], temp_file.name],
                capture_output=True,
                text=True,
                timeout=5
            )
            return result.stdout, result.stderr
        except subprocess.TimeoutExpired:
            return None, "Code execution timed out"
        except Exception as e:
            return None, str(e)
        finally:
            os.unlink(temp_file.name)