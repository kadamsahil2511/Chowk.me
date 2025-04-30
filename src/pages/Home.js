import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import FeatureSlider from '../components/FeatureSlider';
import CategoryFilter from '../components/CategoryFilter';
import PostCard from '../components/PostCard';
import PostDetailsModal from '../components/PostDetailsModal';
import SkeletonLoader from '../components/SkeletonLoader';
import { ShoppingBag, Check } from 'lucide-react';
import data from '../data/data.json';

const Home = ({ selectedCategory, selectedCity, postCreated }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const location = useLocation();
  
  // Function to handle opening the post details modal
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Full list of categories including the "More" option for dropdown
  const categories = [
    'All', 'Business', 'Freelance', '18+', 'Finance', 'Travel', 'More',
    // General Categories
    'Tech', 'Education', 'Events', 'Real Estate', 'Health & Fitness',
    // Casual & Lifestyle
    'Food', 'Entertainment', 'Fashion & Beauty', 'Automobile', 'Gaming',
    // Community & Local Needs
    'Lost & Found', 'Social Causes', 'Buying & Selling', 'Legal & Law', 'Miscellaneous', 'Housing', 'Sale'
  ];

  // Fetch and combine posts from API and localStorage
  const fetchPosts = useCallback(async () => {
    try {
      // Use imported data directly instead of fetching
      setPosts(data);
      setFilteredPosts(data);
      
      // Only feature posts from the current city
      const cityFilteredPosts = selectedCity ? 
        data.filter(post => post.location === selectedCity && post.featured) :
        data.filter(post => post.featured);
        
      setFeaturedPosts(cityFilteredPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  }, [selectedCity]);

  // Sync local activeCategory with the one passed from App.js
  useEffect(() => {
    if (selectedCategory && categories.includes(selectedCategory)) {
      console.log('Category selected from navbar:', selectedCategory);
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory, categories]);

  // Initialize posts data
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  // Show notification when new post is added via location state or when postCreated prop is true
  useEffect(() => {
    if (location.state?.newPostAdded || postCreated) {
      setNotification('Your post was created successfully!');
      fetchPosts(); // Refresh posts to show the newly created one
      
      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, postCreated, fetchPosts]);

  // Modified filter behavior - filter by both category and city
  const handleCategorySelect = (category) => {
    console.log('Setting active category to:', category);
    setActiveCategory(category);
  };

  // Filter posts based on active category and selected city
  useEffect(() => {
    let filtered = [...posts];
    
    // First filter by city if selected
    if (selectedCity) {
      filtered = filtered.filter(post => post.location === selectedCity);
    }
    
    // Then filter by category if not 'All'
    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    console.log(`Filtered to ${filtered.length} posts with category "${activeCategory}" and city "${selectedCity || 'all cities'}"`);
    setFilteredPosts(filtered);
    
    // Update featured posts based on city as well
    const updatedFeaturedPosts = selectedCity ? 
      posts.filter(post => post.location === selectedCity && post.featured) :
      posts.filter(post => post.featured);
      
    setFeaturedPosts(updatedFeaturedPosts);
    
  }, [activeCategory, posts, selectedCity]);

  return (
    <div className="bg-bg-soft min-h-screen">
      {/* Success notification */}
      {notification && (
        <div className="fixed top-20 right-4 left-4 md:left-auto md:right-6 md:w-96 bg-green-50 p-4 rounded-lg shadow-card z-50 flex items-center">
          <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
          <p className="text-green-700">{notification}</p>
        </div>
      )}
    
      {/* Featured Posts Slider */}
      {loading ? (
        <>
          {/* Skeleton for Featured Posts */}
          <section className="mb-10 pt-4">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-5">
                <div className="w-40 h-7 bg-gray-200 animate-pulse rounded"></div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex gap-5 overflow-hidden">
                <SkeletonLoader type="feature" count={3} />
              </div>
            </div>
          </section>
          
          {/* Skeleton for Main Content */}
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <div className="w-64 h-8 bg-gray-200 animate-pulse rounded mb-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonLoader type="card" count={6} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {featuredPosts.length > 0 && <FeatureSlider featuredPosts={featuredPosts} onOpenModal={handlePostClick} />}
          
          {/* Main Content: On the Market */}
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-text-primary">
                <ShoppingBag size={20} className="mr-2" />
                {selectedCity ? `On the market in ${selectedCity}` : 'On the market'}
              </h2>
              
              {/* Category filter - passing the custom handler
              <CategoryFilter 
                categories={categories} 
                activeCategory={activeCategory} 
                setActiveCategory={handleCategorySelect} 
              /> */}
              
              {/* Posts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-fr">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={{
                        ...post,
                        description: post.description && post.description.trim().length > 0
                          ? post.description
                          : `This is a post about ${post.title}. Find out more details by clicking on the card.`
                      }}
                      isHighlighted={activeCategory !== 'All' && post.category === activeCategory}
                      onOpenModal={handlePostClick}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="bg-white rounded-card p-8 shadow-card">
                      <p className="text-text-secondary text-lg">No posts found in this category{selectedCity ? ` in ${selectedCity}` : ''}.</p>
                      <button 
                        onClick={() => setActiveCategory('All')} 
                        className="mt-4 px-6 py-2 bg-black text-white rounded-pill"
                      >
                        View all posts
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* Post Details Modal */}
      {isModalOpen && (
        <PostDetailsModal 
          post={selectedPost} 
          onClose={closeModal} 
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Home;