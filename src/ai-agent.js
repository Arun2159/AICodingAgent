const { OpenAI } = require('openai');
const fs = require('fs-extra');
const path = require('path');

class AICodingAgent {
    constructor(apiKey) {
        this.openai = new OpenAI({
            apiKey: apiKey || process.env.OPENAI_API_KEY
        });
    }

    async analyzePrompt(prompt, projectType) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert at analyzing software requirements and determining project structure. Output only valid JSON."
                    },
                    {
                        role: "user",
                        content: `Analyze this prompt and provide a JSON response with required technologies, project structure, and main features for a ${projectType} application: ${prompt}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            });

            return JSON.parse(response.choices[0].message.content);
        } catch (error) {
            throw new Error(`Failed to analyze prompt: ${error.message}`);
        }
    }

    async generateCode(requirement, projectType, context = {}) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert at generating clean, efficient, production-ready code. Include necessary imports and documentation."
                    },
                    {
                        role: "user",
                        content: `Generate code for a ${projectType} application requirement: ${requirement}\nContext: ${JSON.stringify(context)}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            });

            return response.choices[0].message.content;
        } catch (error) {
            throw new Error(`Failed to generate code: ${error.message}`);
        }
    }

    async createProject(projectName, analysis) {
        const projectDir = path.join(process.cwd(), projectName);
        await fs.ensureDir(projectDir);

        // Create project structure
        for (const dir of analysis.structure.directories || []) {
            await fs.ensureDir(path.join(projectDir, dir));
        }

        // Generate main configuration files
        await this.generateConfigFiles(projectDir, analysis);

        // Generate code files
        for (const feature of analysis.features || []) {
            const code = await this.generateCode(feature, analysis.projectType, {
                projectName,
                ...analysis
            });
            
            const fileName = this.getFileName(feature, analysis.projectType);
            const filePath = path.join(projectDir, fileName);
            await fs.writeFile(filePath, code);
        }

        return projectDir;
    }

    async generateConfigFiles(projectDir, analysis) {
        // Generate package.json or equivalent
        const configFiles = {
            'web': {
                'package.json': this.generatePackageJson(analysis),
                'README.md': this.generateReadme(analysis)
            },
            'mobile': {
                'package.json': this.generatePackageJson(analysis),
                'app.json': this.generateAppJson(analysis)
            },
            'desktop': {
                'package.json': this.generatePackageJson(analysis),
                'main.js': this.generateMainJs(analysis)
            }
        };

        const files = configFiles[analysis.projectType] || {};
        for (const [filename, content] of Object.entries(files)) {
            await fs.writeFile(
                path.join(projectDir, filename),
                typeof content === 'string' ? content : JSON.stringify(content, null, 2)
            );
        }
    }

    getFileName(feature, projectType) {
        const baseName = feature.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const extensions = {
            'web': '.js',
            'mobile': '.js',
            'desktop': '.js'
        };

        return `src/${baseName}${extensions[projectType] || '.js'}`;
    }

    generatePackageJson(analysis) {
        return {
            name: analysis.projectName,
            version: "1.0.0",
            description: analysis.description || "",
            main: "src/index.js",
            scripts: this.getScripts(analysis.projectType),
            dependencies: this.getDependencies(analysis.projectType, analysis.technologies)
        };
    }

    getScripts(projectType) {
        const scripts = {
            'web': {
                "start": "react-scripts start",
                "build": "react-scripts build",
                "test": "react-scripts test"
            },
            'mobile': {
                "start": "expo start",
                "android": "expo start --android",
                "ios": "expo start --ios"
            },
            'desktop': {
                "start": "electron .",
                "build": "electron-builder"
            }
        };
        return scripts[projectType] || {};
    }

    getDependencies(projectType, technologies = []) {
        const deps = {
            'web': {
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-scripts": "5.0.1"
            },
            'mobile': {
                "react-native": "^0.72.0",
                "expo": "^48.0.0"
            },
            'desktop': {
                "electron": "^25.0.0"
            }
        };

        return {
            ...(deps[projectType] || {}),
            ...this.getAdditionalDependencies(technologies)
        };
    }

    getAdditionalDependencies(technologies) {
        const techMap = {
            'typescript': { "typescript": "^5.0.0" },
            'redux': { "redux": "^4.2.0", "react-redux": "^8.1.0" },
            'router': { "react-router-dom": "^6.14.0" }
        };

        return technologies.reduce((deps, tech) => ({
            ...deps,
            ...(techMap[tech.toLowerCase()] || {})
        }), {});
    }

    generateReadme(analysis) {
        return `# ${analysis.projectName}

${analysis.description || ''}

## Features
${(analysis.features || []).map(f => `- ${f}`).join('\n')}

## Getting Started
1. Install dependencies: \`npm install\`
2. Start the development server: \`npm start\`

## Technologies Used
${(analysis.technologies || []).map(t => `- ${t}`).join('\n')}
`;
    }
}

module.exports = AICodingAgent; 