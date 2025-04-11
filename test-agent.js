const { AICodingAgent } = require('./src/ai-agent');

async function testAgent() {
    try {
        const agent = new AICodingAgent();
        
        // Test case: Generate a simple React component
        const prompt = "Create a simple React component that displays a counter with increment and decrement buttons";
        
        console.log("Generating code for:", prompt);
        const result = await agent.generateCode(prompt);
        
        console.log("\nGenerated Code:");
        console.log(result.code);
        
        if (result.explanation) {
            console.log("\nExplanation:");
            console.log(result.explanation);
        }
        
    } catch (error) {
        console.error("Error testing AI agent:", error);
    }
}

testAgent(); 