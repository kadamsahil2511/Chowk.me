import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  PencilLine, 
  Trash2, 
  Search, 
  Plus, 
  LogOut,
  AlertTriangle,
  Check,

} from 'lucide-react';
import data from '../data/data.json';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Form state for creating/editing posts
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: 'Dehradun',
    link: '',
    image: null,
    imagePreview: null
  });
  
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

  // Fetch posts from localStorage and API
  useEffect(() => {
    // Use imported data directly instead of fetching
    setPosts(data);
    setLoading(false);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.username?.toLowerCase().includes(query)
    );
  });

  // Handle input changes for the form
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
      location: 'Dehradun',
      link: '',
      image: null,
      imagePreview: null
    });
    setIsEditMode(false);
    setSelectedPost(null);
  };
  
  // Handle edit post click
  const handleEditClick = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      category: post.category,
      location: post.location,
      link: post.link || '',
      image: null,
      imagePreview: post.image
    });
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle form submission for creating/editing posts
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.category || !formData.location) {
        setNotification({
          message: 'Please fill in all required fields',
          type: 'error'
        });
        return;
      }
      
      if (isEditMode && selectedPost) {
        // Edit existing post
        const updatedPosts = posts.map(post => {
          if (post.id === selectedPost.id) {
            return {
              ...post,
              title: formData.title,
              description: formData.description,
              category: formData.category,
              location: formData.location,
              link: formData.link,
              image: formData.imagePreview || post.image,
              // Keep other properties like timestamp, username, etc.
            };
          }
          return post;
        });
        
        setPosts(updatedPosts);
        localStorage.setItem('chowk_posts', JSON.stringify(
          updatedPosts.filter(post => !post.id.toString().includes('api_'))
        ));
        
        setNotification({
          message: 'Post updated successfully!',
          type: 'success'
        });
      } else {
        // Create new post
        const newPost = {
          id: `admin_${Date.now()}`,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          username: 'admin', // Admin username
          location: formData.location,
          image: formData.imagePreview || `https://picsum.photos/seed/${formData.category}/400/250`,
          featured: false,
          timestamp: new Date().toISOString(),
          link: formData.link
        };
        
        // Add new post to state and localStorage
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        
        // Update localStorage (only save posts that originated from the app, not API)
        const localPosts = updatedPosts.filter(post => !post.id.toString().includes('api_'));
        localStorage.setItem('chowk_posts', JSON.stringify(localPosts));
        
        setNotification({
          message: 'Post created successfully!',
          type: 'success'
        });
      }
      
      // Reset form after submission
      resetForm();
      
    } catch (error) {
      console.error('Error saving post:', error);
      setNotification({
        message: 'Failed to save post. Please try again.',
        type: 'error'
      });
    }
  };
  
  // Handle delete post
  const confirmDelete = (post) => {
    setSelectedPost(post);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = () => {
    try {
      if (!selectedPost) return;
      
      // Filter out the selected post
      const updatedPosts = posts.filter(post => post.id !== selectedPost.id);
      setPosts(updatedPosts);
      
      // Update localStorage (only save posts that originated from the app, not API)
      const localPosts = updatedPosts.filter(post => !post.id.toString().includes('api_'));
      localStorage.setItem('chowk_posts', JSON.stringify(localPosts));
      
      setNotification({
        message: 'Post deleted successfully!',
        type: 'success'
      });
      setShowDeleteConfirm(false);
      
    } catch (error) {
      console.error('Error deleting post:', error);
      setNotification({
        message: 'Failed to delete post. Please try again.',
        type: 'error'
      });
    }
  };
  
  // Clear notification after timeout
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  return (
    <div className="min-h-screen bg-bg-soft pb-12">
      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto md:right-6 md:w-96 p-4 rounded-lg shadow-card z-50 flex items-center ${
          notification.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {notification.type === 'error' ? (
            <AlertTriangle size={20} className="mr-3 flex-shrink-0" />
          ) : (
            <Check size={20} className="mr-3 flex-shrink-0" />
          )}
          <p>{notification.message}</p>
        </div>
      )}
      
      {/* Header/Navbar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {/* Post Form Section */}
        <section className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center mb-6">
            <Plus size={20} className="mr-2" />
            <h2 className="text-xl font-bold">{isEditMode ? 'Edit Post' : 'Create New Post'}</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Post title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              
              {/* Description */}
              <div className="col-span-2">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Post description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows={4}
                  required
                />
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                  City *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
              
              {/* Link */}
              <div className="col-span-2">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              
              {/* Image Upload */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Image (Optional)
                </label>
                <div className="flex items-start">
                  {formData.imagePreview && (
                    <div className="mr-4 mb-4">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="col-span-2 flex justify-end space-x-3 mt-4">
                {isEditMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  {isEditMode ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </div>
          </form>
        </section>
        
        {/* Posts Management Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Manage Posts</h2>
            
            {/* Search posts */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          
          {/* Posts Table */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-card p-6">
              <p className="text-center py-8">Loading posts...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {post.image && (
                                <img 
                                  src={post.image} 
                                  alt={post.title}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                              )}
                              <div className="truncate max-w-xs">
                                {post.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {post.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {post.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(post.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                            <button
                              onClick={() => handleEditClick(post)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <PencilLine size={16} />
                            </button>
                            <button
                              onClick={() => confirmDelete(post)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No posts found. Create your first post above.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete "{selectedPost?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;