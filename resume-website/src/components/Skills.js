import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.div`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const SkillCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  color: #667eea;
  margin: 0;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  color: #666;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: "•";
    color: #667eea;
  }
`;

function Skills() {
  return (
    <SkillsContainer>
      <SectionTitle>Skills</SectionTitle>
      <SkillsGrid>
        <SkillCategory>
          <CategoryTitle>Frontend</CategoryTitle>
          <SkillList>
            <SkillItem>React</SkillItem>
            <SkillItem>JavaScript (ES6+)</SkillItem>
            <SkillItem>HTML5 & CSS3</SkillItem>
            <SkillItem>Styled Components</SkillItem>
            <SkillItem>Redux</SkillItem>
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Backend</CategoryTitle>
          <SkillList>
            <SkillItem>Node.js</SkillItem>
            <SkillItem>Express</SkillItem>
            <SkillItem>Python</SkillItem>
            <SkillItem>Django</SkillItem>
            <SkillItem>RESTful APIs</SkillItem>
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Database</CategoryTitle>
          <SkillList>
            <SkillItem>MongoDB</SkillItem>
            <SkillItem>PostgreSQL</SkillItem>
            <SkillItem>MySQL</SkillItem>
            <SkillItem>Redis</SkillItem>
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Tools & Others</CategoryTitle>
          <SkillList>
            <SkillItem>Git & GitHub</SkillItem>
            <SkillItem>Docker</SkillItem>
            <SkillItem>AWS</SkillItem>
            <SkillItem>CI/CD</SkillItem>
            <SkillItem>Agile/Scrum</SkillItem>
          </SkillList>
        </SkillCategory>
      </SkillsGrid>
    </SkillsContainer>
  );
}

export default Skills; 