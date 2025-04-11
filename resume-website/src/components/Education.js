import React from 'react';
import styled from 'styled-components';

const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
`;

const EducationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Degree = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin: 0;
`;

const Institution = styled.h4`
  font-size: 1.1rem;
  color: #667eea;
  margin: 0;
`;

const Duration = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
`;

function Education() {
  return (
    <EducationContainer>
      <SectionTitle>Education</SectionTitle>
      
      <EducationItem>
        <Degree>Master of Science in Computer Science</Degree>
        <Institution>University of Technology</Institution>
        <Duration>2015 - 2017</Duration>
        <Description>
          • Specialized in Software Engineering and Artificial Intelligence
          • Thesis: "Machine Learning Applications in Web Development"
          • GPA: 3.8/4.0
        </Description>
      </EducationItem>

      <EducationItem>
        <Degree>Bachelor of Science in Computer Science</Degree>
        <Institution>State University</Institution>
        <Duration>2011 - 2015</Duration>
        <Description>
          • Focus on Web Development and Database Systems
          • Minor in Mathematics
          • Dean's List: 2013-2015
        </Description>
      </EducationItem>
    </EducationContainer>
  );
}

export default Education; 