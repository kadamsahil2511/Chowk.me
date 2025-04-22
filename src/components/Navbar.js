import React, { useState, useEffect } from 'react';
import { MagnifyingGlass, CaretDown, MapPin, List, X } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onCategorySelect, selectedCity, onCityChange, activeCategory = 'All', onPostClick }) => {
  const navigate = useNavigate();
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [localActiveCategory, setLocalActiveCategory] = useState(activeCategory);
  
  const cities = ['Dehradun', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur'];
  const categories = [
    { name: 'All', icon: '' },
    { name: 'Business', icon: '💼' },
    { name: 'Freelance', icon: '👤' },
    { name: '18+', icon: '🔞' }, 
    { name: 'Finance', icon: '💰' },
    { name: 'Travel', icon: '🧳' },
    { name: 'More', icon: '' }
  ];

  // Sync local active category with the one passed from props
  useEffect(() => {
    setLocalActiveCategory(activeCategory);
  }, [activeCategory]);
  
  const handleCategoryClick = (category) => {
    setLocalActiveCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    setMobileCategoriesOpen(false);
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

  // Updated to use onPostClick prop instead of navigating
  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick();
    } else {
      navigate('/create-post'); // Fallback to navigation if prop not provided
    }
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      {/* Main Navbar - fixed at top */}
      <nav className="bg-[#EDF3F8] border-b border-[#CBD5E1] w-full sticky top-0 z-50">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <div className="flex items-center pl-6 md:pl-10">
            <Link to="/" className="font-bold text-3xl text-black font-['Inter']">
              Chowk
            </Link>
            
            <button 
              className="md:hidden ml-3 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="font-medium text-gray-600 hover:text-black cursor-pointer">
              Home
            </Link>
            <Link to="/about" className="font-medium text-gray-600 hover:text-black cursor-pointer">
              About
            </Link>
            <Link to="/features" className="font-medium text-gray-600 hover:text-black cursor-pointer">
              Features
            </Link>
          </div>
          
          {/* Login & Post Buttons */}
          <div className="flex items-center">
            <button className="hidden md:flex items-center justify-center w-[180px] bg-white text-gray-800 font-medium transition-colors duration-200 h-[80px] border-l border-[#CBD5E1] hover:bg-black hover:text-white">
              Log in
            </button>
            <button 
              onClick={handlePostClick}
              className="bg-[#E1B845] text-gray-900 font-medium w-[180px] flex items-center justify-center h-[80px] hover:bg-pink-500 hover:text-white transition-colors duration-200"
            >
              Post
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 px-6">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="py-2 hover:bg-gray-50 px-2 font-medium flex items-center" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="py-2 hover:bg-gray-50 px-2 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/features" className="py-2 hover:bg-gray-50 px-2 flex items-center" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <button className="py-2 border border-gray-300 text-gray-800 font-medium hover:bg-black hover:text-white transition-colors duration-200 w-full text-center mt-2">
                Log in
              </button>
              <button 
                onClick={handlePostClick}
                className="py-2 bg-[#E1B845] text-gray-900 font-medium hover:bg-pink-500 hover:text-white transition-colors duration-200 w-full text-center"
              >
                Post
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Search & Filter Area */}
      <div className="bg-[#EDF3F8] py-5 px-4 md:px-10">
        <div className="container mx-auto">
          {/* City Selector and Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* City Selector Button */}
            <div className="relative w-full sm:w-auto">
              <div 
                className="flex items-center gap-1.5 cursor-pointer bg-black text-white px-4 py-2.5 rounded-full w-full sm:w-auto justify-center sm:justify-start"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
              >
                <span className="font-medium">{selectedCity}</span>
                <CaretDown 
                  size={16} 
                  weight="bold"
                  className={`transition-transform duration-200 ${showCityDropdown ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {showCityDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-lg w-full sm:w-48 z-50 max-h-60 overflow-y-auto">
                  {cities.map((cityName) => (
                    <div 
                      key={cityName}
                      className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${
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
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MagnifyingGlass size={20} weight="bold" className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#D1D5DB] bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 text-base"
                />
              </div>
            </form>
          </div>
          
          {/* Category Filters - Desktop */}
          <div className="hidden md:block border-b border-[#CBD5E1] pb-2">
            <div className="flex space-x-8">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`
                    cursor-pointer pb-2 text-gray-600 transition-all duration-200
                    flex items-center
                    ${localActiveCategory === category.name ? 
                      'border-b-2 border-black font-medium text-black' : 
                      'hover:text-black'
                    }
                  `}
                >
                  {category.icon && <span className="mr-1.5">{category.icon}</span>}
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Categories */}
          <div className="md:hidden border-b border-[#CBD5E1] pb-2">
            <div className="flex space-x-6 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`
                    cursor-pointer pb-1 whitespace-nowrap transition-all duration-200
                    flex items-center
                    ${localActiveCategory === category.name ? 
                      'border-b-2 border-black font-medium text-black' : 
                      'text-gray-600 hover:text-black'
                    }
                  `}
                >
                  {category.icon && <span className="mr-1.5">{category.icon}</span>}
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
