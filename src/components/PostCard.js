import React, { useState, useEffect } from 'react';
import { MapPin, Clock, User } from 'lucide-react';
import getPlaceholderImage, { getRandomDimensions } from '../utils/imagePlaceholders';

const PostCard = ({ post, isFeatured = false }) => {
  const [imageDimensions, setImageDimensions] = useState({ width: 400, height: 250 });
  
  useEffect(() => {
    // Generate random dimensions when the component mounts
    setImageDimensions(getRandomDimensions());
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Business': 'bg-pastel-yellow text-yellow-800',
      'Freelance': 'bg-pastel-blue text-blue-800',
      'Travel': 'bg-pastel-blue text-blue-800',
      'Sale': 'bg-pastel-purple text-purple-800',
      'Events': 'bg-pastel-orange text-orange-800',
      'Education': 'bg-pastel-purple text-purple-800',
      'Lost': 'bg-pastel-red text-red-800',
      'Food': 'bg-pastel-orange text-orange-800',
      'Housing': 'bg-pastel-green text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Business': '💼',
      'Freelance': '💻',
      'Travel': '🧳',
      'Sale': '🛍️',
      'Events': '🎉',
      'Education': '🎓',
      'Lost': '🧣',
      'Food': '🍛',
      'Housing': '🏠',
    };
    return icons[category] || '🧃';
  };

  // Use Picsum Photos API with dynamic dimensions
  const getImageUrl = () => {
    // For remote images that don't start with /images/, keep them as is
    if (post.image && !post.image.startsWith('/images/') && !post.image.includes('picsum.photos')) {
      return post.image;
    }
    
    // For local /images/ paths or if no image is provided, use Picsum
    return getPlaceholderImage(post.category, imageDimensions);
  };

  return (
    <div className={`bg-white rounded-card overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 ${
      isFeatured ? 'h-full transform hover:-translate-y-1' : 'hover:-translate-y-1'
    }`}>
      <div className="relative">
        <img 
          src={getImageUrl()}
          alt={post.title}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = getPlaceholderImage('default', imageDimensions);
          }}
          className="w-full h-48 sm:h-56 object-cover"
        />
        {isFeatured && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-pill">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        {/* User info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <User size={16} />
            </div>
            <span className="ml-2 text-sm font-medium text-text-secondary">@{post.username}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <MapPin size={14} className="mr-1" />
            {post.location}
          </div>
        </div>

        {/* Post content */}
        <h3 className="font-semibold text-lg text-text-primary line-clamp-1">{post.title}</h3>
        <p className="text-text-secondary mt-1.5 text-sm line-clamp-2">{post.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className={`flex items-center px-3 py-1 rounded-pill text-xs font-medium ${getCategoryColor(post.category)}`}>
            <span className="mr-1">{getCategoryIcon(post.category)}</span>
            {post.category}
          </div>
          
          <div className="flex items-center text-xs text-gray-400">
            <Clock size={12} className="mr-1" />
            <span>2h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;