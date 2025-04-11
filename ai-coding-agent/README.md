# AI Coding Agent

An intelligent system that generates applications from natural language prompts.

## Features

- Generate web, mobile, and desktop applications from natural language descriptions
- Automatic project scaffolding
- Code generation using OpenAI's GPT models
- Support for multiple project types and frameworks
- Interactive CLI interface

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```
3. Set up your OpenAI API key in a `.env` file:
```
OPENAI_API_KEY=your_api_key_here
```

## Usage

### Generate a New Project

```bash
python main.py generate "Create a todo app with user authentication and a modern UI" --type web --name todo-app
```

### List Project Structure

```bash
python main.py list todo-app
```

## Project Types

- **Web**: React-based web applications
- **Mobile**: React Native mobile applications
- **Desktop**: Electron-based desktop applications

## How It Works

1. The agent analyzes your prompt to determine:
   - Project type
   - Required features
   - Dependencies
   - Project structure

2. Based on the analysis, it:
   - Generates appropriate project structure
   - Creates necessary files and directories
   - Generates initial code
   - Sets up dependencies

3. You can then:
   - Navigate to the project directory
   - Install dependencies
   - Start development

## Example Prompts

- "Create a blog website with user authentication and markdown support"
- "Build a mobile app for tracking daily expenses"
- "Make a desktop app for managing local files"

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License 