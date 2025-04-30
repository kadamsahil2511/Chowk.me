import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLink, FaYoutube } from 'react-icons/fa';

const TileContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const TileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #555;
`;

const TileTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #111;
  margin: 0;
`;

const TileDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TileLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentTile = ({ type, title, description, link }) => {
  const getIcon = () => {
    switch (type) {
      case 'github':
        return <FaGithub />;
      case 'youtube':
        return <FaYoutube />;
      default:
        return <FaLink />;
    }
  };

  return (
    <TileContainer>
      <TileHeader>
        <IconWrapper>{getIcon()}</IconWrapper>
        <TileTitle>{title}</TileTitle>
      </TileHeader>
      <TileDescription>{description}</TileDescription>
      <TileLink href={link} target="_blank">
        View Project <FaLink size={12} />
      </TileLink>
    </TileContainer>
  );
};

export default ContentTile; 