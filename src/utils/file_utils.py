import os
import shutil
from pathlib import Path
from typing import List, Dict, Any

class FileUtils:
    @staticmethod
    def copy_template_files(source_dir: str, target_dir: str, template_config: Dict[str, Any]):
        """
        Copy template files to the target directory
        """
        try:
            # Create target directory if it doesn't exist
            Path(target_dir).mkdir(parents=True, exist_ok=True)

            # Copy files based on template configuration
            for file_type, files in template_config.get("files", {}).items():
                for file in files:
                    source_path = os.path.join(source_dir, file)
                    target_path = os.path.join(target_dir, file)
                    
                    # Create directory if it doesn't exist
                    os.makedirs(os.path.dirname(target_path), exist_ok=True)
                    
                    if os.path.exists(source_path):
                        shutil.copy2(source_path, target_path)

            return True
        except Exception as e:
            raise Exception(f"Error copying template files: {str(e)}")

    @staticmethod
    def create_file(file_path: str, content: str):
        """
        Create a new file with the given content
        """
        try:
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            with open(file_path, 'w') as f:
                f.write(content)
            
            return True
        except Exception as e:
            raise Exception(f"Error creating file: {str(e)}")

    @staticmethod
    def get_template_path(template_type: str) -> str:
        """
        Get the path to the template directory
        """
        base_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'templates')
        return os.path.join(base_path, template_type) 