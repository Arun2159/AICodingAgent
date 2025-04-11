import os
import json
from typing import Dict, Any
import openai
from pathlib import Path

class CodeGenerator:
    def __init__(self, api_key: str):
        self.api_key = api_key
        openai.api_key = api_key

    def generate_code(self, prompt: str, context: Dict[str, Any] = None) -> str:
        """
        Generate code based on the prompt and context
        """
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful coding assistant that generates clean, efficient code."},
                    {"role": "user", "content": f"Generate code for: {prompt}"}
                ],
                temperature=0.7,
                max_tokens=1000
            )
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"Error generating code: {str(e)}")

    def create_project_structure(self, project_name: str, template_path: str):
        """
        Create project structure based on template
        """
        try:
            with open(template_path, 'r') as f:
                template = json.load(f)
            
            # Create project directory
            project_dir = Path(project_name)
            project_dir.mkdir(exist_ok=True)

            # Create package.json
            package_json = {
                "name": project_name,
                "version": "1.0.0",
                "private": True,
                "dependencies": template["dependencies"]
            }

            with open(project_dir / "package.json", "w") as f:
                json.dump(package_json, f, indent=2)

            # Create project structure
            for dir_path in template["structure"]:
                (project_dir / dir_path).mkdir(parents=True, exist_ok=True)

            return True
        except Exception as e:
            raise Exception(f"Error creating project structure: {str(e)}") 