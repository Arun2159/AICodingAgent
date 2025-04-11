# AI Coding Agent

An intelligent coding assistant that generates functional applications from natural language prompts. This tool enables developers to quickly scaffold and create applications with minimal manual coding.

## 🚀 Features

- **Natural Language Processing**: Convert plain English descriptions into fully functional applications
- **Multiple Project Types Support**:
  - Web Applications (React, Next.js)
  - Mobile Applications (React Native)
  - Desktop Applications (Electron)
  - Specific Website Types:
    - Business Websites
    - Portfolio Websites
    - E-commerce Websites
    - Blog Websites
    - Restaurant Websites
- **Smart Technology Selection**: AI-powered analysis to choose the best tech stack for your needs
- **Automated Setup**:
  - Project structure generation
  - Dependency management
  - Configuration files
  - Basic routing and components
  - Common features implementation
- **Interactive CLI**: User-friendly command-line interface for project creation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key
- Git (for version control)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ankan/Hackathon.git
cd Hackathon
```

2. Install dependencies:
```bash
npm install
```

3. Set up your OpenAI API key:
```bash
# For Linux/Mac
export OPENAI_API_KEY=your-api-key-here

# For Windows (PowerShell)
$env:OPENAI_API_KEY="your-api-key-here"
```

## 💻 Usage

### Command Line Interface

Generate a new project using the interactive CLI:

```bash
npm run generate
```

Or specify options directly:

```bash
npm run generate -- -p "Create a React web app for a todo list" -t web -n my-todo-app
```

### Available Options

| Option | Alias | Description | Example |
|--------|-------|-------------|---------|
| `--prompt` | `-p` | Project description prompt | "Create a React todo app" |
| `--type` | `-t` | Project type | web, mobile, desktop |
| `--name` | `-n` | Project name | my-awesome-app |

## 📚 Examples

### Basic Todo App
```bash
npm run generate -- -p "Create a React web app for managing tasks with user authentication and dark mode support" -t web -n task-manager
```

### E-commerce Website
```bash
npm run generate -- -p "Create an e-commerce website with product catalog, shopping cart, and payment integration" -t web -n online-store
```

### Restaurant Website
```bash
npm run generate -- -p "Create a restaurant website with menu, online ordering, and reservation system" -t web -n food-delivery
```

## 🔧 Project Structure

The generated projects follow best practices and include:

- **Source Code**: Well-organized component structure
- **Configuration**: Pre-configured build tools and linters
- **Documentation**: README and API documentation
- **Testing**: Basic test setup
- **Assets**: Organized static files

## 🤝 Contributing

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

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- All contributors who have helped improve this project

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Join our Discord community
- Email us at ankan@example.com 