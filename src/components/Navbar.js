import React, { useState } from 'react';
import { Search, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onCategorySelect, selectedCity, onCityChange, activeCategory = 'All' }) => {
  const navigate = useNavigate();
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cities = ['Dehradun', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur'];
  const categories = [
    { name: 'All', icon: '🧃' },
    { name: 'Business', icon: '💼' },
    { name: 'Freelance', icon: '💻' },
    { name: 'Food', icon: '🍛' },
    { name: 'Travel', icon: '🧳' },
    { name: 'Lost', icon: '🧣' },
    { name: 'Events', icon: '🎉' },
    { name: 'Education', icon: '🎓' },
    { name: 'Sale', icon: '🛍️' },
    { name: 'Housing', icon: '🏠' }
  ];
  
  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };
  
  const handleCitySelect = (cityName) => {
    onCityChange(cityName);
    setShowCityDropdown(false);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Search functionality can be implemented here
  };

  const handlePostClick = () => {
    navigate('/create-post');
  };
  
  return (
    <nav className="bg-white shadow-soft w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Top Navbar: Logo, Search, City, Post Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="font-semibold text-2xl">
              <span className="font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Chowk</span>
            </Link>
            
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-text-primary hover:text-black font-medium">Home</Link>
            <Link to="/categories" className="text-text-secondary hover:text-black">Categories</Link>
            <Link to="/about" className="text-text-secondary hover:text-black">About</Link>
            <Link to="/contact" className="text-text-secondary hover:text-black">Contact</Link>
          </div>
          
          {/* City Selector */}
          <div className="relative">
            <div 
              className="flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-black border border-gray-200 px-3 py-1.5 rounded-pill transition-all hover:border-gray-300"
              onClick={() => setShowCityDropdown(!showCityDropdown)}
            >
              <MapPin size={16} className="text-gray-500" />
              <span className="font-medium">{selectedCity}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${showCityDropdown ? 'rotate-180' : ''}`} />
            </div>
            
            {showCityDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-card rounded-lg py-2 w-40 z-50 max-h-80 overflow-y-auto">
                {cities.map((cityName) => (
                  <div 
                    key={cityName}
                    className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                      selectedCity === cityName ? 'font-medium bg-gray-50' : ''
                    }`}
                    onClick={() => handleCitySelect(cityName)}
                  >
                    {cityName}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Post Button */}
          <button 
            onClick={handlePostClick}
            className="bg-black text-white font-medium px-6 py-2 rounded-pill hover:bg-gray-800 transition-colors"
          >
            Post
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 mt-3">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="py-2 hover:bg-gray-50 px-2 rounded font-medium">Home</Link>
              <Link to="/categories" className="py-2 hover:bg-gray-50 px-2 rounded">Categories</Link>
              <Link to="/about" className="py-2 hover:bg-gray-50 px-2 rounded">About</Link>
              <Link to="/contact" className="py-2 hover:bg-gray-50 px-2 rounded">Contact</Link>
            </div>
          </div>
        )}
        
        {/* Search Bar */}
        <form className="relative w-full mt-4 mb-2" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={`Search for posts in ${selectedCity}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-pill border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button type="submit" className="absolute right-4 top-3 text-gray-500">
            <Search size={20} />
          </button>
        </form>
        
        {/* Category Filters */}
        <div className="mt-2 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex gap-2 whitespace-nowrap">
            {categories.map((category) => (
              <div 
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`
                  cursor-pointer px-3.5 py-2 rounded-pill text-sm transition-all
                  flex items-center border 
                  ${activeCategory === category.name ? 
                    'bg-gray-100 border-gray-300 font-medium shadow-inner' : 
                    'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-soft'
                  }
                `}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;