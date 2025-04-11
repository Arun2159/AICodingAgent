import os
import json
import openai
from typing import Dict, Any, List
from pathlib import Path

class AICodingAgent:
    def __init__(self, api_key: str):
        self.api_key = api_key
        openai.api_key = api_key
        self.templates_dir = Path(__file__).parent.parent / 'templates'
        self.project_types = ['web', 'mobile', 'desktop']

    def process_prompt(self, prompt: str, project_type: str = None) -> Dict[str, Any]:
        """
        Process the user's prompt and generate appropriate code and project structure
        """
        try:
            # Analyze the prompt to determine project requirements
            analysis = self._analyze_prompt(prompt)
            
            # Generate project structure
            project_structure = self._generate_project_structure(
                analysis['project_type'] if project_type is None else project_type,
                analysis['requirements']
            )
            
            # Generate initial code files
            code_files = self._generate_code_files(analysis['requirements'])
            
            return {
                'analysis': analysis,
                'project_structure': project_structure,
                'code_files': code_files
            }
        except Exception as e:
            raise Exception(f"Error processing prompt: {str(e)}")

    def _analyze_prompt(self, prompt: str) -> Dict[str, Any]:
        """
        Analyze the prompt to determine project requirements and type
        """
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert at analyzing software requirements and determining project structure."},
                    {"role": "user", "content": f"Analyze this prompt and determine the project type and requirements: {prompt}"}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            analysis = json.loads(response.choices[0].message.content)
            return analysis
        except Exception as e:
            raise Exception(f"Error analyzing prompt: {str(e)}")

    def _generate_project_structure(self, project_type: str, requirements: List[str]) -> Dict[str, Any]:
        """
        Generate the project structure based on type and requirements
        """
        try:
            # Load template for the project type
            template_path = self.templates_dir / f"{project_type}.json"
            with open(template_path, 'r') as f:
                template = json.load(f)
            
            # Generate project structure based on requirements
            structure = {
                'type': project_type,
                'files': [],
                'directories': [],
                'dependencies': template['dependencies']
            }
            
            # Add required files and directories based on requirements
            for req in requirements:
                if req in template['requirements']:
                    structure['files'].extend(template['requirements'][req]['files'])
                    structure['directories'].extend(template['requirements'][req]['directories'])
            
            return structure
        except Exception as e:
            raise Exception(f"Error generating project structure: {str(e)}")

    def _generate_code_files(self, requirements: List[str]) -> Dict[str, str]:
        """
        Generate initial code files based on requirements
        """
        try:
            code_files = {}
            
            for req in requirements:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "You are an expert at generating clean, efficient code."},
                        {"role": "user", "content": f"Generate code for: {req}"}
                    ],
                    temperature=0.7,
                    max_tokens=1000
                )
                
                code_files[req] = response.choices[0].message.content
            
            return code_files
        except Exception as e:
            raise Exception(f"Error generating code files: {str(e)}")

    def create_project(self, project_name: str, structure: Dict[str, Any], code_files: Dict[str, str]):
        """
        Create the project files and directories
        """
        try:
            project_dir = Path(project_name)
            project_dir.mkdir(exist_ok=True)
            
            # Create directories
            for directory in structure['directories']:
                (project_dir / directory).mkdir(parents=True, exist_ok=True)
            
            # Create files
            for file_path, content in code_files.items():
                full_path = project_dir / file_path
                full_path.parent.mkdir(parents=True, exist_ok=True)
                with open(full_path, 'w') as f:
                    f.write(content)
            
            # Create package.json or equivalent
            if structure['type'] in ['web', 'mobile']:
                package_json = {
                    "name": project_name,
                    "version": "1.0.0",
                    "private": True,
                    "dependencies": structure['dependencies']
                }
                
                with open(project_dir / "package.json", "w") as f:
                    json.dump(package_json, f, indent=2)
            
            return True
        except Exception as e:
            raise Exception(f"Error creating project: {str(e)}") 