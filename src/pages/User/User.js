import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon, GlobeSimple, Book, Rocket, Calendar, Trophy } from 'phosphor-react';
import { Mail, Twitter, Instagram, Linkedin, Github, Moon, Sun, Music } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto">
          <SkeletonLoader type="profile" />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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

  // Placeholder social media data - in a real application, these would come from user data
  const socialLinks = [
    { title: 'Twitter', icon: <Twitter size={24} />, url: `https://twitter.com/${username}`, color: 'bg-blue-50 text-blue-600' },
    { title: 'Instagram', icon: <Instagram size={24} />, url: `https://instagram.com/${username}`, color: 'bg-pink-50 text-pink-600' },
    { title: 'LinkedIn', icon: <Linkedin size={24} />, url: `https://linkedin.com/in/${username}`, color: 'bg-blue-50 text-blue-700' },
    { title: 'GitHub', icon: <Github size={24} />, url: `https://github.com/${username}`, color: 'bg-gray-50 text-gray-700' },
  ];

  // Some placeholder user interests for bento box - in a real app, these would be dynamic
  const generatePlaceholderSections = () => {
    // Create seed for consistent randomness based on username
    const seed = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    const placeholderInterests = [
      { 
        title: "Currently Reading", 
        icon: <Book size={24} />, 
        content: [
          "Design Systems that Scale",
          "The Psychology of Money",
          "Atomic Habits"
        ][seed % 3],
        color: "bg-emerald-50 text-emerald-700",
        span: 1
      },
      { 
        title: "Current Project", 
        icon: <Rocket size={24} />, 
        content: [
          "Building a design system",
          "Learning Rust",
          "Open source contributions"
        ][seed % 3],
        color: "bg-purple-50 text-purple-700",
        span: 2
      },
      { 
        title: "Listening to", 
        icon: <Music size={24} />, 
        content: [
          "Lo-fi beats",
          "Jazz classics",
          "Indie rock"
        ][seed % 3],
        color: "bg-red-50 text-red-700",
        span: 1
      },
      { 
        title: "Latest Achievement", 
        icon: <Trophy size={24} />, 
        content: [
          "Completed 30 day coding challenge",
          "Launched new portfolio",
          "Contributed to React"
        ][seed % 3],
        color: "bg-amber-50 text-amber-700",
        span: 1
      },
      { 
        title: "Availability", 
        icon: <Calendar size={24} />, 
        content: [
          "Open to freelance projects",
          "Available for consultation",
          "Fully booked until July"
        ][seed % 3],
        color: "bg-sky-50 text-sky-700",
        span: 1
      }
    ];
    
    return placeholderInterests;
  };

  // Generate dynamic placeholder content based on username
  const userInterests = generatePlaceholderSections();

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left column - User Profile - Fixed position */}
          <div className="w-full lg:w-1/3">
            <div className="lg:fixed lg:max-w-[calc(25%-2rem)]" style={{ width: 'inherit', maxWidth: '350px' }}>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  {/* Profile Picture */}
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-2 border-gray-100">
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
                  
                  {/* User Name & Title */}
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">{userProfile.username}</h1>
                  <p className="text-gray-600 mb-4">{userProfile.bio || "Software Developer & Designer"}</p>
                  
                  <div className="w-16 h-0.5 bg-gray-200 mb-4"></div>
                  
                  {/* User Info */}
                  <div className="flex flex-col gap-3 w-full">
                    {userProfile.location && (
                      <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-2 text-gray-400" />
                        <span>{userProfile.location}</span>
                      </div>
                    )}

                    {userProfile.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail size={18} className="mr-2 text-gray-400" />
                        <a href={`mailto:${userProfile.email}`} className="hover:text-blue-600 transition-colors">
                          {userProfile.email}
                        </a>
                      </div>
                    )}
                    
                    {userProfile.link && (
                      <div className="flex items-center text-gray-600">
                        <GlobeSimple size={18} className="mr-2 text-gray-400" />
                        <a 
                          href={userProfile.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {userProfile.link.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-16 h-0.5 bg-gray-200 my-4"></div>
                  
                  {/* Contact Button */}
                  <Link 
                    to={`mailto:${userProfile.email || "contact@example.com"}`} 
                    className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 w-full text-center"
                  >
                    Contact for Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Bento Grid */}
          <div className="w-full lg:w-2/3">
            {/* Social Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} rounded-xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 shadow-sm`}
                >
                  <div className="mb-2">{link.icon}</div>
                  <div className="font-medium">{link.title}</div>
                </a>
              ))}
            </div>
            
            {/* User Interests Bento Box */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {userInterests.map((item, index) => (
                <div 
                  key={index} 
                  className={`${item.color} rounded-xl p-5 ${item.span > 1 ? 'md:col-span-' + item.span : ''} shadow-sm`}
                >
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{item.icon}</span>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>

            {/* User Posts Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Posts by {userProfile.username}</h2>
              
              {userPosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">This user hasn't created any posts yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userPosts.slice(0, 4).map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
              
              {userPosts.length > 4 && (
                <div className="mt-4 text-center">
                  <Link to={`/posts/${username}`} className="text-blue-600 hover:underline">
                    View all posts ({userPosts.length})
                  </Link>
                </div>
              )}
            </div>
            
            {/* Theme Preference */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-sm p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Thanks for visiting!</h3>
                  <p className="mt-1">Feel free to check out my posts and connect with me.</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/20 rounded-full" aria-label="Light mode">
                    <Sun size={20} />
                  </button>
                  <button className="p-2 bg-white/20 rounded-full" aria-label="Dark mode">
                    <Moon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;