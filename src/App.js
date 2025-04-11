import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 3rem;
  border-radius: 12px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  p {
    color: #718096;
    font-size: 0.95rem;
  }
`;

function App() {
  const [formData, setFormData] = useState({
    prompt: '',
    type: 'web',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here we would integrate with the AI agent
    console.log('Generating project:', formData);
  };

  return (
    <Container>
      <Header>
        <Title>AI Coding Agent</Title>
        <Subtitle>
          Transform your ideas into working applications with the power of AI.
          Just describe what you want to build, and let our AI handle the coding.
        </Subtitle>
      </Header>

      <Card>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="prompt">Describe Your Application</Label>
            <TextArea
              id="prompt"
              placeholder="Example: Create a social media app with user authentication, post creation, and commenting features..."
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="desktop">Desktop Application</option>
            </Select>
          </div>

          <Button type="submit" disabled={!formData.prompt}>
            Generate Application
          </Button>
        </Form>
      </Card>

      <FeatureGrid>
        <FeatureCard>
          <h3>Smart Code Generation</h3>
          <p>Our AI analyzes your requirements and generates clean, maintainable code following best practices.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Multiple Platforms</h3>
          <p>Build web, mobile, or desktop applications with the same simple interface.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Complete Projects</h3>
          <p>Get fully functional applications with proper structure, dependencies, and documentation.</p>
        </FeatureCard>
      </FeatureGrid>
    </Container>
  );
}

export default App; 