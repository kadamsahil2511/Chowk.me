import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Info, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    imagePreview: null,
    location: 'Dehradun', // Default location
    link: '' // Added link field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'Business', label: 'Business', icon: '💼' },
    { value: 'Freelance', label: 'Freelance', icon: '💻' },
    { value: 'Food', label: 'Food', icon: '🍛' },
    { value: 'Travel', label: 'Travel', icon: '🧳' },
    { value: 'Lost', label: 'Lost', icon: '🧣' },
    { value: 'Events', label: 'Events', icon: '🎉' },
    { value: 'Education', label: 'Education', icon: '🎓' },
    { value: 'Sale', label: 'Sale', icon: '🛍️' },
    { value: 'Housing', label: 'Housing', icon: '🏠' }
  ];
  
  const cities = [
    'Dehradun', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 
    'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur'
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitLoading(true); // Show skeleton loader
    setError('');
    
    try {
      // In a real app, you would send this data to your backend API
      // For now, we'll simulate a successful post creation
      
      // Create a new post object
      const newPost = {
        id: Date.now(), // Generate a temporary ID
        title: formData.title,
        description: formData.description,
        category: formData.category,
        username: currentUser?.username || 'anonymous', // Use the username from current user
        location: formData.location,
        image: formData.imagePreview || `https://picsum.photos/seed/${formData.category}/400/250`,
        featured: false,
        timestamp: new Date().toISOString(),
        link: formData.link // Added link to the post object
      };
      
      // In a real application, you would send this data to your backend
      console.log('Submitting post:', newPost);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes, we'll store the new post in localStorage
      const existingPosts = JSON.parse(localStorage.getItem('chowk_posts') || '[]');
      localStorage.setItem('chowk_posts', JSON.stringify([newPost, ...existingPosts]));
      
      // Redirect to home page after successful post
      navigate('/', { state: { newPostAdded: true } });
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
      setSubmitLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Component to render form or skeleton loader
  const renderContent = () => {
    if (submitLoading) {
      return (
        <div className="bg-white rounded-card shadow-card p-6">
          <div className="flex justify-center mb-4">
            <Loader className="animate-spin text-gray-500" size={32} />
          </div>
          <div className="w-full h-6 bg-gray-200 animate-pulse mb-4 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 animate-pulse mb-8 rounded"></div>
          
          <div className="space-y-4">
            <div className="w-1/3 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div>
            
            <div className="w-1/3 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-32 bg-gray-200 animate-pulse rounded"></div>
            
            <div className="w-1/3 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div>
            
            <div className="w-1/3 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded"></div>
            
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded mt-6"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-card shadow-card p-6">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className="block text-text-primary font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What's your post about?"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              required
            />
          </div>
          
          {/* Description */}
          <div className="mb-5">
            <label htmlFor="description" className="block text-text-primary font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell people more details about your post..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              rows={5}
              required
            />
          </div>
          
          {/* Category */}
          <div className="mb-5">
            <label htmlFor="category" className="block text-text-primary font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="mb-5">
            <label htmlFor="location" className="block text-text-primary font-medium mb-2">
              City *
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none"
              required
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          {/* Link - new field */}
          <div className="mb-5">
            <label htmlFor="link" className="block text-text-primary font-medium mb-2">
              Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            />
          </div>
          
          {/* Image Upload */}
          <div className="mb-5">
            <label className="block text-text-primary font-medium mb-2">
              Image (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center py-4">
                {formData.imagePreview ? (
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="max-h-52 mb-3 rounded-lg" 
                  />
                ) : (
                  <Upload size={32} className="text-gray-400 mb-2" />
                )}
                <span className="text-sm text-gray-500">
                  {formData.imagePreview ? 'Change image' : 'Click to upload image'}
                </span>
              </label>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
              <Info size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white font-medium py-3 rounded-pill hover:bg-gray-800 transition ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Posting...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="bg-bg-soft min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold">Create a Post</h1>
        </div>
        
        {/* Form or Skeleton Loader */}
        {renderContent()}
      </div>
    </div>
  );
};

export default CreatePost;