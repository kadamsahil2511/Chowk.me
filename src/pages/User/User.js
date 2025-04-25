import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon } from 'phosphor-react';
import { Mail } from 'lucide-react';
import PostCard from '../../components/PostCard';
import SkeletonLoader from '../../components/SkeletonLoader';

const User = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get avatar URL using specific IDs from avatar.iran.liara.run
  const getAvatarUrl = (username) => {
    // List of specific avatar IDs to use
    const maleAvatarIds = [17, 39, 35, 15, 21, 14, 19, 40, 44, 42, 41, 7, 3, 10, 43, 18];
    const femaleAvatarIds = [100, 97, 74, 75, 76, 56, 55, 58, 80, 96, 72, 95, 59, 90, 52, 78];
    
    // Create a deterministic but consistent index based on username
    const seed = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    // Determine if we should use male or female avatar based on username seed
    const useFemalePath = seed % 2 === 0;
    const avatarList = useFemalePath ? femaleAvatarIds : maleAvatarIds;
    
    // Select an avatar ID from the appropriate list
    const avatarId = avatarList[seed % avatarList.length];
    
    // Return the avatar URL with the selected ID
    return `https://avatar.iran.liara.run/public/${avatarId}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Fetch data.json
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        // Find user profile
        const user = data.find(item => item.username === username);
        if (!user) {
          throw new Error('User not found');
        }
        
        setUserProfile(user);
        
        // Find all posts by this user
        const posts = data.filter(item => item.username === username && item.title);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <SkeletonLoader type="profile" />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-gray-200">
              <img 
                src={getAvatarUrl(userProfile.username)}
                alt={`${userProfile.username}'s avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://avatar.iran.liara.run/public/17";
                }}
              />
            </div>
            
            {/* User Info */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{userProfile.username}</h1>
              
              <div className="flex flex-col gap-3">
                {userProfile.email && (
                  <div className="flex items-center justify-center md:justify-start text-gray-600">
                    <Mail size={18} className="mr-2" />
                    <a href={`mailto:${userProfile.email}`}>{userProfile.email}</a>
                  </div>
                )}
                
                {userProfile.location && (
                  <div className="flex items-center justify-center md:justify-start text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <span>{userProfile.location}</span>
                  </div>
                )}

                {userProfile.link && (
                  <div className="flex items-center justify-center md:justify-start text-gray-600">
                    <LinkIcon size={18} className="mr-2" />
                    <a 
                      href={userProfile.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {userProfile.link.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* User Posts Section */}
        <h2 className="text-xl font-bold mb-4">Posts by {userProfile.username}</h2>
        
        {userPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">This user hasn't created any posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;