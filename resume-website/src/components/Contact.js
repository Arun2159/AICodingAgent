import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactContainer = styled.div`
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

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Icon = styled.div`
  color: #667eea;
  font-size: 1.5rem;
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const Value = styled.span`
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
`;

function Contact() {
  return (
    <ContactContainer>
      <SectionTitle>Contact</SectionTitle>
      <ContactInfo>
        <ContactItem>
          <Icon>
            <FaEnvelope />
          </Icon>
          <ContactText>
            <Label>Email</Label>
            <Value>your.email@example.com</Value>
          </ContactText>
        </ContactItem>

        <ContactItem>
          <Icon>
            <FaPhone />
          </Icon>
          <ContactText>
            <Label>Phone</Label>
            <Value>+1 (123) 456-7890</Value>
          </ContactText>
        </ContactItem>

        <ContactItem>
          <Icon>
            <FaMapMarkerAlt />
          </Icon>
          <ContactText>
            <Label>Location</Label>
            <Value>San Francisco, CA</Value>
          </ContactText>
        </ContactItem>
      </ContactInfo>
    </ContactContainer>
  );
}

export default Contact; 