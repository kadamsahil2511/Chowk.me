import React from 'react';
import styled from 'styled-components';
import { getUserData } from '../utils/dataUtils';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Name = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;
`;

const TagLine = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 16px;
`;

const BentoProfileCard = ({ username }) => {
  const profile = getUserData(username);

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <ProfileContainer>
      <Avatar src={profile.avatar} alt={profile.name} />
      <InfoContainer>
        <Name>{profile.name}</Name>
        <TagLine>{profile.tagLine}</TagLine>
        <Location>
          <span>📍</span>
          <span>{profile.location}</span>
        </Location>
      </InfoContainer>
    </ProfileContainer>
  );
};

export default BentoProfileCard; 