import React, { useState, useEffect } from 'react';
import { Upload, Info, Loader, X } from 'lucide-react';
import getPlaceholderImage from '../utils/imagePlaceholders';

const PostFormModal = ({ isOpen, onClose, defaultCity }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    imagePreview: null,
    location: defaultCity || 'Dehradun', // Default location from props
    link: '' // Added link field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image: null,
      imagePreview: null,
      location: defaultCity || 'Dehradun',
      link: '' // Reset link field
    });
    setError('');
    setSuccess(false);
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
    setSubmitLoading(true); // Show loader
    setError('');
    
    try {
      // Create a new post object
      const newPost = {
        id: Date.now(), // Generate a temporary ID
        title: formData.title,
        description: formData.description,
        category: formData.category,
        username: 'current_user', // In a real app, this would come from authentication
        location: formData.location,
        image: formData.imagePreview || getPlaceholderImage(formData.category, { width: 400, height: 250 }),
        featured: false,
        timestamp: new Date().toISOString(),
        link: formData.link // Added link to the post object
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes, store the new post in localStorage
      const existingPosts = JSON.parse(localStorage.getItem('chowk_posts') || '[]');
      localStorage.setItem('chowk_posts', JSON.stringify([newPost, ...existingPosts]));
      
      // Show success message and reset form
      setSuccess(true);
      resetForm();
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose(true); // Pass true to indicate successful submission
      }, 1500);
      
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitLoading(false);
    }
  };

  // Close modal and reset form
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Create a New Post</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-black"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-4">
          {submitLoading ? (
            <div className="py-12 flex flex-col items-center">
              <Loader className="animate-spin text-gray-500 mb-4" size={32} />
              <p className="text-gray-500">Posting your content...</p>
            </div>
          ) : success ? (
            <div className="py-12 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Post Created Successfully!</h3>
              <p className="text-gray-500">Your post has been published.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-5">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell people more details about your post..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  rows={4}
                  required
                />
              </div>
              
              {/* Category */}
              <div className="mb-5">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="link" className="block text-gray-700 font-medium mb-2">
                  Link (Optional)
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
                <label className="block text-gray-700 font-medium mb-2">
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
                        className="max-h-48 mb-3 rounded-lg" 
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
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg mr-3 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Posting...' : 'Publish Post'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;