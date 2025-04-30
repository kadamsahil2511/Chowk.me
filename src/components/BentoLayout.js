import React from 'react';
import styled from 'styled-components';

const BentoContainer = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  height: calc(100vh - 64px); // Adjust based on your navbar height

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const LeftColumn = styled.div`
  position: sticky;
  top: 24px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow-y: auto;
  padding-right: 12px;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const BentoLayout = ({ leftColumn, rightColumn }) => {
  return (
    <BentoContainer>
      <LeftColumn>{leftColumn}</LeftColumn>
      <RightColumn>{rightColumn}</RightColumn>
    </BentoContainer>
  );
};

export default BentoLayout; 