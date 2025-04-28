import React, { useEffect } from 'react';
import { X, MapPin, Clock, User, Link as LinkIcon } from 'lucide-react';

const PostDetailsModal = ({ isOpen, onClose, post }) => {
  // Effect to control body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Disable background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  // If modal is not open or no post data, don't render anything
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            {post.category && (
              <span className="mr-2">{getCategoryIcon(post.category)}</span>
            )}
            Post Details
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-black"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-0">
          {/* Post Image */}
          {post.image && (
            <div className="w-full h-[300px] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
              {post.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{post.location}</span>
                </div>
              )}
              
              {post.timestamp && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{formatDate(post.timestamp)}</span>
                </div>
              )}
              
              {post.username && (
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                <span><a href={`/${post.username}`}>{post.username}</a></span>
                </div>
              )}
              
              {post.category && (
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  {post.category}
                </div>
              )}
            </div>
            
            {/* Post Description */}
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{post.description}</p>
            </div>
            
            {/* Link Display - New Section */}
            {post.link && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-black"
                >
                  <LinkIcon size={16} className="mr-2" />
                  <span className="underline">{post.link}</span>
                </a>
              </div>
            )}
            
            {/* Post Actions */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsModal;