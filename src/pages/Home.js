import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import FeatureSlider from '../components/FeatureSlider';
import CategoryFilter from '../components/CategoryFilter';
import PostCard from '../components/PostCard';
import { ShoppingBag, Check } from 'lucide-react';

const Home = ({ selectedCategory, selectedCity }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState('');
  
  const location = useLocation();
  
  const categories = ['All', 'Business', 'Freelance', 'Food', 'Travel', 'Lost', 'Events', 'Education', 'Sale', 'Housing'];

  // Fetch and combine posts from API and localStorage
  const fetchPosts = useCallback(async () => {
    try {
      // Fetch mock data from JSON file
      const response = await fetch('/data.json');
      const apiData = await response.json();
      
      // Get posts from localStorage
      const localPosts = JSON.parse(localStorage.getItem('chowk_posts') || '[]');
      
      // Combine posts, with localStorage posts appearing first
      const allPosts = [...localPosts, ...apiData];
      
      console.log('All posts loaded:', allPosts);
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      
      // Only feature posts from the current city
      const cityFilteredPosts = selectedCity ? 
        allPosts.filter(post => post.location === selectedCity && post.featured) :
        allPosts.filter(post => post.featured);
        
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
  
  // Show notification when new post is added
  useEffect(() => {
    if (location.state?.newPostAdded) {
      setNotification('Your post was created successfully!');
      
      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

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
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
            <p className="text-text-secondary">Loading amazing posts...</p>
          </div>
        </div>
      ) : (
        <>
          {featuredPosts.length > 0 && <FeatureSlider featuredPosts={featuredPosts} />}
          
          {/* Main Content: On the Market */}
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center text-text-primary">
                <ShoppingBag size={20} className="mr-2" />
                {selectedCity ? `On the market in ${selectedCity}` : 'On the market'}
              </h2>
              
              {/* Category filter - passing the custom handler */}
              <CategoryFilter 
                categories={categories} 
                activeCategory={activeCategory} 
                setActiveCategory={handleCategorySelect} 
              />
              
              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      isHighlighted={activeCategory !== 'All' && post.category === activeCategory}
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
    </div>
  );
};

export default Home;