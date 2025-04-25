import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Link as LinkIcon } from 'phosphor-react';
import { Link } from 'react-router-dom';
import getPlaceholderImage from '../utils/imagePlaceholders';

const PostCard = ({ post, onOpenModal }) => {
  const [imageDimensions] = useState({ width: 400, height: 300 });

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

  const getCategoryIcon = (category) => {
    const icons = {
      'Business': '💼',
      'Freelance': '👤',
      'Travel': '🧳',
      'Sale': '🛍️',
      'Events': '🎉',
      'Education': '📚',
      'Lost': '🧣',
      'Food': '🍛',
      'Housing': '🏠',
      'Buy & Sell': '📱',
    };
    return icons[category] || '';
  };

  // Use Picsum Photos API with dynamic dimensions
  const getImageUrl = () => {
    if (post.image && !post.image.startsWith('/images/') && !post.image.includes('picsum.photos')) {
      return post.image;
    }
    return getPlaceholderImage(post.category, imageDimensions);
  };

  const handlePostClick = () => {
    if (onOpenModal) {
      onOpenModal(post);
    }
  };

  return (
    <div 
      className="bg-white overflow-hidden transition-all duration-300 hover:shadow-[5px_5px_0px_0px_rgba(255,20,147,0.3)] border border-gray-100 cursor-pointer"
      onClick={handlePostClick}
    >
      {/* Image Part */}
      <div className="relative">
        <img 
          src={getImageUrl()}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        
        {post.featured && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        
        {/* Link indicator badge */}
        {post.link && (
          <div className="absolute top-3 left-3 bg-blue-500 bg-opacity-70 text-white text-xs px-3 py-1 rounded-full flex items-center">
            <LinkIcon size={12} weight="bold" className="mr-1" />
            <span>Link</span>
          </div>
        )}
      </div>
      
      {/* Content Part */}
      <div className="p-4">
        {/* Title with arrow link */}
        <div className="group">
          <div className="inline-block">
            <h3 className="font-bold text-xl mb-2 pr-6 relative">
              {post.title}
              <ArrowUpRight 
                size={18}
                weight="bold"
                className="absolute right-0 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </h3>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>
        
        {/* User with avatar from avatar-placeholder API */}
        <div className="flex items-center mb-4">
          <Link 
            to={`/user/${post.username}`} 
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={(e) => e.stopPropagation()} // Prevent triggering post modal when clicking on username
          >
            <img 
              src={getAvatarUrl(post.username)}
              alt={`${post.username}'s avatar`}
              className="w-8 h-8 rounded-full mr-2"
              onError={(e) => {
                // Fallback in case the avatar API fails
                e.target.onerror = null;
                e.target.src = "https://avatar.iran.liara.run/public/17";
              }}
            />
            <span className="text-gray-500 text-sm hover:text-blue-600"><a href={`http://localhost:3000/user/${post.username}`}>@{post.username}</a></span>
          </Link>
        </div>
        
        {/* Footer with location and category */}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <MapPin 
              size={14} 
              weight="fill"
              className="mr-1 text-gray-400" 
            />
            <span className="text-gray-500">{post.location}</span>
          </div>
          
          <div className={`px-2.5 py-1 rounded-full flex items-center ${
            post.category === 'Business' ? 'bg-yellow-100' : 
            post.category === 'Food' ? 'bg-green-100' :
            post.category === 'Travel' ? 'bg-blue-100' : 
            post.category === 'Events' ? 'bg-purple-100' :
            post.category === 'Education' ? 'bg-indigo-100' :
            post.category === 'Sale' ? 'bg-pink-100' :
            post.category === 'Lost' ? 'bg-red-100' :
            post.category === 'Freelance' ? 'bg-orange-100' :
            post.category === 'Housing' ? 'bg-teal-100' : 'bg-gray-100'
          }`}>
            {getCategoryIcon(post.category) && (
              <span className="mr-1">{getCategoryIcon(post.category)}</span>
            )}
            <span className="font-medium text-xs">{post.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;