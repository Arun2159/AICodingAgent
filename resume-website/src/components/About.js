import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
`;

const Highlight = styled.span`
  color: #667eea;
  font-weight: 500;
`;

function About() {
  return (
    <AboutContainer>
      <SectionTitle>About Me</SectionTitle>
      <AboutText>
        I am a passionate <Highlight>Full Stack Developer</Highlight> with expertise in building modern web applications.
        With a strong foundation in both frontend and backend technologies, I specialize in creating
        responsive, user-friendly interfaces and robust server-side solutions.
      </AboutText>
      <AboutText>
        My approach to development combines <Highlight>clean code</Highlight> practices with a focus on
        <Highlight> user experience</Highlight> and <Highlight>performance optimization</Highlight>. I am constantly
        learning and adapting to new technologies to stay at the forefront of web development.
      </AboutText>
    </AboutContainer>
  );
}

export default About; 