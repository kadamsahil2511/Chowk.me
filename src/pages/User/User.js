import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Link as LinkIcon, GlobeSimple, Book, Rocket, Calendar, Trophy, Pencil } from 'phosphor-react';
import { Mail, Twitter, Instagram, Linkedin, Github, Moon, Sun, Music } from 'lucide-react';
import PostCard from '../../components/PostCard';
import SkeletonLoader from '../../components/SkeletonLoader';
import { useAuth } from '../../context/AuthContext';
import { getUserData, getUserPosts } from '../../utils/dataUtils';

const User = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const isOwnProfile = currentUser && currentUser.username === username;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // First try to fetch from users.json
        let usersResponse = await fetch('/users.json');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        let usersData = await usersResponse.json();
        
        // Also check localStorage for any additional registered users
        const localUsersJson = localStorage.getItem('chowk_all_users');
        if (localUsersJson) {
          const localUsers = JSON.parse(localUsersJson);
          // Combine with users from JSON file, avoiding duplicates by ID
          const existingIds = new Set(usersData.map(u => u.id));
          const uniqueLocalUsers = localUsers.filter(u => !existingIds.has(u.id));
          usersData = [...usersData, ...uniqueLocalUsers];
        }
        
        const userData = usersData.find(user => user.username === username);
        
        // Fetch posts from data.json
        const postsResponse = await fetch('/data.json');
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts data');
        }
        
        const postsData = await postsResponse.json();
        const userPosts = postsData.filter(item => item.username === username && item.title);
        
        if (userData) {
          // Use user data from combined sources
          setUserProfile(userData);
        } else {
          // Fallback to data.json for basic user info
          const fallbackUser = postsData.find(item => item.username === username);
          if (!fallbackUser) {
            throw new Error('User not found');
          }
          setUserProfile(fallbackUser);
        }
        
        setUserPosts(userPosts);
        console.log("User profile data:", userData); // Debug profile data
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  // Load user data from localStorage if not found in users.json
  useEffect(() => {
    if (!loading && !userProfile) {
      const localUsersJson = localStorage.getItem('chowk_all_users');
      if (localUsersJson) {
        const localUsers = JSON.parse(localUsersJson);
        const userData = localUsers.find(user => user.username === username);
        if (userData) {
          setUserProfile(userData);
        }
      }
    }
  }, [loading, username, userProfile]);

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

  // Create social links from user's social profiles - with better error handling
  const socialLinks = [];
  
  if (userProfile.socialProfiles) {
    if (userProfile.socialProfiles.twitter) {
      socialLinks.push({ 
        title: 'Twitter', 
        icon: <Twitter size={24} />, 
        url: `https://twitter.com/${userProfile.socialProfiles.twitter}`,
        color: 'bg-blue-50 text-blue-600'
      });
    }
    
    if (userProfile.socialProfiles.instagram) {
      socialLinks.push({ 
        title: 'Instagram', 
        icon: <Instagram size={24} />, 
        url: `https://instagram.com/${userProfile.socialProfiles.instagram}`,
        color: 'bg-pink-50 text-pink-600'
      });
    }
    
    if (userProfile.socialProfiles.linkedin) {
      socialLinks.push({ 
        title: 'LinkedIn', 
        icon: <Linkedin size={24} />, 
        url: `https://linkedin.com/in/${userProfile.socialProfiles.linkedin}`,
        color: 'bg-blue-50 text-blue-700'
      });
    }
    
    if (userProfile.socialProfiles.github) {
      socialLinks.push({ 
        title: 'GitHub', 
        icon: <Github size={24} />, 
        url: `https://github.com/${userProfile.socialProfiles.github}`,
        color: 'bg-gray-50 text-gray-700' 
      });
    }
  }

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
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left column - User Profile - Fixed position */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-[130px]">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  {/* Profile Picture */}
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-gray-100">
                    <img 
                      src={userProfile.profilePic || `https://avatar.iran.liara.run/public/17?username=${userProfile.username}`}
                      alt={`${userProfile.username}'s avatar`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://avatar.iran.liara.run/public/17";
                      }}
                    />
                  </div>
                  
                  {/* User Name & Title */}
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">
                    {userProfile.name || userProfile.username}
                  </h1>
                  <p className="text-gray-600 mb-3">@{userProfile.username}</p>
                  
                  {/* Bio with better visibility */}
                  {userProfile.bio && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 text-gray-700">
                      <p className="text-sm italic">{userProfile.bio}</p>
                    </div>
                  )}
                  
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
                          href={userProfile.link.startsWith('http') ? userProfile.link : `https://${userProfile.link}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors text-sm truncate"
                        >
                          {userProfile.link.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    )}

                    {userProfile.joinedDate && (
                      <div className="flex items-center text-gray-600">
                        <Calendar size={18} className="mr-2 text-gray-400" />
                        <span>Joined {new Date(userProfile.joinedDate).toLocaleDateString(undefined, {year: 'numeric', month: 'long'})}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-16 h-0.5 bg-gray-200 my-4"></div>
                  
                  {/* Action Buttons */}
                  <div className="w-full space-y-3">
                    {isOwnProfile ? (
                      <Link 
                        to="/profile-settings" 
                        className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 w-full"
                      >
                        <Pencil size={18} className="mr-2" />
                        Edit Profile
                      </Link>
                    ) : (
                      <Link 
                        to={`mailto:${userProfile.email || "contact@example.com"}`} 
                        className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition duration-200 w-full text-center"
                      >
                        Contact for Projects
                      </Link>
                    )}

                    {/* Only show "Create Post" button if viewing own profile */}
                    {isOwnProfile && (
                      <Link
                        to="/create-post"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 w-full text-center"
                      >
                        Create New Post
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Bento Grid */}
          <div className="w-full lg:w-2/3">
            {/* Social Links Grid */}
            {socialLinks.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Connect with {userProfile.name || userProfile.username}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
              </div>
            )}
            
            {/* User Interests Bento Box */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Interests & Activities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userProfile.interests && userProfile.interests.length > 0 ? (
                  // Show actual interests if available
                  userProfile.interests.map((interest, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold">{interest}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  // Otherwise show placeholder interests
                  userInterests.map((item, index) => (
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
                  ))
                )}
              </div>
            </div>

            {/* User Posts Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Posts by {userProfile.username}</h2>
                {isOwnProfile && (
                  <Link to="/create-post" className="text-blue-600 hover:underline text-sm font-medium">
                    + New Post
                  </Link>
                )}
              </div>
              
              {userPosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">This user hasn't created any posts yet.</p>
                  {isOwnProfile && (
                    <Link 
                      to="/create-post"
                      className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                    >
                      Create Your First Post
                    </Link>
                  )}
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