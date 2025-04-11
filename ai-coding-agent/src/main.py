#!/usr/bin/env python3

import os
import click
from dotenv import load_dotenv
from rich.console import Console
from rich.prompt import Prompt
from core.agent import AICodingAgent
from pathlib import Path

# Load environment variables
load_dotenv()

# Initialize rich console
console = Console()

@click.group()
def cli():
    """AI Coding Agent - Generate applications from natural language prompts"""
    pass

@cli.command()
@click.argument('prompt')
@click.option('--type', '-t', type=click.Choice(['web', 'mobile', 'desktop']), help='Project type')
@click.option('--name', '-n', default='my-app', help='Project name')
def generate(prompt, type, name):
    """Generate a new project from a prompt"""
    try:
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            console.print("[red]Error: OPENAI_API_KEY not found in environment variables[/red]")
            return

        agent = AICodingAgent(api_key)
        
        console.print("[yellow]Analyzing your prompt...[/yellow]")
        result = agent.process_prompt(prompt, type)
        
        console.print("[green]✓ Prompt analyzed[/green]")
        console.print(f"[blue]Project Type:[/blue] {result['analysis']['project_type']}")
        console.print("[blue]Requirements:[/blue]")
        for req in result['analysis']['requirements']:
            console.print(f"  • {req}")
        
        console.print("\n[yellow]Generating project structure...[/yellow]")
        agent.create_project(name, result['project_structure'], result['code_files'])
        
        console.print(f"[green]✓ Project '{name}' created successfully![/green]")
        console.print("\n[blue]Next steps:[/blue]")
        console.print("1. Navigate to your project directory")
        console.print("2. Install dependencies (if any)")
        console.print("3. Start development!")
        
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/red]")

@cli.command()
@click.argument('project_name')
def list(project_name):
    """List the structure of a generated project"""
    try:
        project_path = Path(project_name)
        if not project_path.exists():
            console.print(f"[red]Error: Project '{project_name}' not found[/red]")
            return

        console.print(f"[blue]Project Structure for '{project_name}':[/blue]")
        for root, dirs, files in os.walk(project_name):
            level = root.replace(project_name, '').count(os.sep)
            indent = ' ' * 4 * level
            console.print(f"{indent}{os.path.basename(root)}/")
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                console.print(f"{subindent}{f}")
        
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/red]")

if __name__ == '__main__':
    cli() 