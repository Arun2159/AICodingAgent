import React from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
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

const ExperienceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const JobTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin: 0;
`;

const Company = styled.h4`
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

function Experience() {
  return (
    <ExperienceContainer>
      <SectionTitle>Work Experience</SectionTitle>
      
      <ExperienceItem>
        <JobTitle>Senior Full Stack Developer</JobTitle>
        <Company>Tech Company Inc.</Company>
        <Duration>January 2020 - Present</Duration>
        <Description>
          • Led the development of a scalable e-commerce platform using React and Node.js
          • Implemented CI/CD pipelines reducing deployment time by 40%
          • Mentored junior developers and conducted code reviews
        </Description>
      </ExperienceItem>

      <ExperienceItem>
        <JobTitle>Full Stack Developer</JobTitle>
        <Company>Startup Solutions</Company>
        <Duration>June 2018 - December 2019</Duration>
        <Description>
          • Developed and maintained multiple web applications using modern JavaScript frameworks
          • Collaborated with UX designers to implement responsive designs
          • Optimized application performance resulting in 30% faster load times
        </Description>
      </ExperienceItem>

      <ExperienceItem>
        <JobTitle>Junior Developer</JobTitle>
        <Company>WebTech Solutions</Company>
        <Duration>January 2017 - May 2018</Duration>
        <Description>
          • Built and maintained client websites using HTML, CSS, and JavaScript
          • Assisted in backend development using PHP and MySQL
          • Participated in agile development processes
        </Description>
      </ExperienceItem>
    </ExperienceContainer>
  );
}

export default Experience; 