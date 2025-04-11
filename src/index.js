#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const AICodingAgent = require('./ai-agent');

// Initialize the AI agent
const agent = new AICodingAgent();

program
  .name('ai-coding-agent')
  .description('Generate applications from natural language prompts')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a new project from a prompt')
  .option('-p, --prompt <prompt>', 'Project description prompt')
  .option('-t, --type <type>', 'Project type (web, mobile, desktop)')
  .option('-n, --name <name>', 'Project name')
  .action(async (options) => {
    try {
      // If prompt is not provided, ask for it
      if (!options.prompt) {
        const { prompt } = await inquirer.prompt([
          {
            type: 'input',
            name: 'prompt',
            message: 'Describe the application you want to create:',
          }
        ]);
        options.prompt = prompt;
      }

      // If type is not provided, ask for it
      if (!options.type) {
        const { type } = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Select project type:',
            choices: ['web', 'mobile', 'desktop']
          }
        ]);
        options.type = type;
      }

      // If name is not provided, ask for it
      if (!options.name) {
        const { name } = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter project name:',
            default: 'my-app'
          }
        ]);
        options.name = name;
      }

      console.log(chalk.yellow('Analyzing your prompt...'));

      // Analyze the prompt using AI
      const analysis = await agent.analyzePrompt(options.prompt, options.type);
      
      console.log(chalk.green('✓ Prompt analyzed'));
      console.log(chalk.blue('Project Type:'), analysis.projectType);
      console.log(chalk.blue('Technologies:'), analysis.technologies.join(', '));
      console.log(chalk.blue('Features:'));
      analysis.features.forEach(feature => console.log(`  • ${feature}`));

      // Generate project
      console.log(chalk.yellow('\nGenerating project...'));
      const projectPath = await agent.createProject(options.name, {
        ...analysis,
        projectName: options.name,
        projectType: options.type
      });

      console.log(chalk.green(`\n✓ Project created successfully at ${projectPath}`));
      console.log(chalk.blue('\nNext steps:'));
      console.log(`1. cd ${options.name}`);
      console.log('2. npm install');
      console.log('3. npm start');

    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
); 