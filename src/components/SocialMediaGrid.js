import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 16px;
  width: 100%;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 80px);
    justify-content: center;
  }
`;

const SocialCard = styled.a`
  aspect-ratio: 1;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px; /* Increased icon size to cover ~90% of the card */
  padding: 16px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'FaLinkedin':
      return <FaLinkedin />;
    case 'FaTwitter':
      return <FaTwitter />;
    case 'FaInstagram':
      return <FaInstagram />;
    case 'FaGithub':
      return <FaGithub />;
    default:
      return null;
  }
};

const SocialMediaGrid = ({ username }) => {
  const socialLinks = [
    {
      platform: 'LinkedIn',
      icon: 'FaLinkedin',
      color: '#0077B5',
      link: `https://linkedin.com/in/${username}`
    },
    {
      platform: 'Twitter',
      icon: 'FaTwitter',
      color: '#1DA1F2',
      link: `https://twitter.com/${username}`
    },
    {
      platform: 'Instagram',
      icon: 'FaInstagram',
      color: '#E4405F',
      link: `https://instagram.com/${username}`
    },
    {
      platform: 'GitHub',
      icon: 'FaGithub',
      color: '#333',
      link: `https://github.com/${username}`
    }
  ];

  if (!socialLinks.length) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>Social Media</SectionTitle>
      <GridContainer>
        {socialLinks.map((social, index) => (
          <SocialCard 
            key={index} 
            href={social.link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Visit ${social.platform}`}
          >
            <IconWrapper color={social.color}>
              {getIconComponent(social.icon)}
            </IconWrapper>
          </SocialCard>
        ))}
      </GridContainer>
    </Section>
  );
};

export default SocialMediaGrid; 