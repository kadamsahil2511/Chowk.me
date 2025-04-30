import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import BentoLayout from '../../components/BentoLayout';
import BentoProfileCard from '../../components/BentoProfileCard';
import PostCard from '../../components/PostCard';
import SocialMediaGrid from '../../components/SocialMediaGrid';
import { getUserData, getUserPosts } from '../../utils/dataUtils';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Profile = () => {
  const { username } = useParams();
  const userData = getUserData(username);
  const userPosts = getUserPosts(username);

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BentoLayout
      leftColumn={<BentoProfileCard username={username} />}
      rightColumn={
        <div className="flex flex-col gap-6">
          <SocialMediaGrid username={username} />
          <Section>
            <SectionTitle>Posts</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
                  <PostCard
                    key={post.id || index}
                    post={post}
                    variant="portrait"
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No posts yet
                </div>
              )}
            </div>
          </Section>
        </div>
      }
    />
  );
};

export default Profile; 