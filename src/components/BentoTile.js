import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLink, FaYoutube, FaTwitter } from 'react-icons/fa';

const TileContainer = styled.a`
  background: #ffffff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.bgColor || '#F3F4F6'};
  color: ${props => props.iconColor || '#374151'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const TileContent = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 0;
  line-height: 1.5;
`;

const getIconAndColors = (type) => {
  switch (type) {
    case 'github':
      return {
        icon: <FaGithub />,
        bgColor: '#24292E',
        iconColor: '#FFFFFF'
      };
    case 'youtube':
      return {
        icon: <FaYoutube />,
        bgColor: '#FF0000',
        iconColor: '#FFFFFF'
      };
    case 'twitter':
      return {
        icon: <FaTwitter />,
        bgColor: '#1DA1F2',
        iconColor: '#FFFFFF'
      };
    default:
      return {
        icon: <FaLink />,
        bgColor: '#F3F4F6',
        iconColor: '#374151'
      };
  }
};

const BentoTile = ({ type, title, description, link }) => {
  const { icon, bgColor, iconColor } = getIconAndColors(type);

  return (
    <TileContainer href={link} target="_blank" rel="noopener noreferrer">
      <TileHeader>
        <IconWrapper bgColor={bgColor} iconColor={iconColor}>
          {icon}
        </IconWrapper>
        <TileContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TileContent>
      </TileHeader>
    </TileContainer>
  );
};

export default BentoTile; 