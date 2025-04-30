import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const ProfileContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111;
`;

const Bio = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  color: #555;
  font-size: 1.5rem;
  transition: color 0.2s;
  
  &:hover {
    color: #007bff;
  }
`;

const Tag = styled.span`
  display: inline-block;
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

const ProfileInfo = () => {
  const dummyData = {
    name: "John Smith",
    image: "https://via.placeholder.com/150",
    bio: "Full Stack Developer | Open Source Enthusiast | Building amazing web experiences with React and Node.js. Always learning, always coding.",
    tags: ["Web Development", "React", "Node.js", "UI/UX"],
    social: {
      github: "https://github.com/johnsmith",
      linkedin: "https://linkedin.com/in/johnsmith",
      twitter: "https://twitter.com/johnsmith",
      instagram: "https://instagram.com/johnsmith"
    }
  };

  return (
    <ProfileContainer>
      <ProfileImage src={dummyData.image} alt={dummyData.name} />
      <Name>{dummyData.name}</Name>
      <Bio>{dummyData.bio}</Bio>
      
      <SocialLinks>
        <SocialLink href={dummyData.social.github} target="_blank">
          <FaGithub />
        </SocialLink>
        <SocialLink href={dummyData.social.linkedin} target="_blank">
          <FaLinkedin />
        </SocialLink>
        <SocialLink href={dummyData.social.twitter} target="_blank">
          <FaTwitter />
        </SocialLink>
        <SocialLink href={dummyData.social.instagram} target="_blank">
          <FaInstagram />
        </SocialLink>
      </SocialLinks>

      <div>
        {dummyData.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
    </ProfileContainer>
  );
};

export default ProfileInfo; 