# AI Coding Agent

An intelligent coding assistant that generates functional applications from natural language prompts. This tool enables developers to quickly scaffold and create applications with minimal manual coding.

## Features

- Generate complete project structures from natural language descriptions
- Support for multiple project types (web, mobile, desktop)
- Intelligent analysis of requirements and technology selection
- Automatic generation of boilerplate code and configuration files
- Interactive CLI interface for project creation

## Prerequisites

- Node.js (v14 or higher)
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-coding-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up your OpenAI API key:
```bash
export OPENAI_API_KEY=your-api-key-here
```

## Usage

### Command Line Interface

Generate a new project using the interactive CLI:

```bash
npm run generate
```

Or specify options directly:

```bash
npm run generate -- -p "Create a React web app for a todo list" -t web -n my-todo-app
```

### Options

- `-p, --prompt <prompt>`: Project description prompt
- `-t, --type <type>`: Project type (web, mobile, desktop)
- `-n, --name <name>`: Project name

## Example

```bash
npm run generate -- -p "Create a React web app for managing tasks with user authentication and dark mode support" -t web -n task-manager
```

This will:
1. Analyze the requirements using AI
2. Generate a complete project structure
3. Set up necessary dependencies
4. Create boilerplate code for features
5. Generate configuration files

## Project Types

- **Web**: React-based web applications
- **Mobile**: React Native applications
- **Desktop**: Electron applications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 