import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlass, CaretDown, MapPin, List, X } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onCategorySelect, selectedCity, onCityChange, activeCategory = 'All', onPostClick }) => {
  const navigate = useNavigate();
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [localActiveCategory, setLocalActiveCategory] = useState(activeCategory);
  const moreDropdownRef = useRef(null);
  
  const cities = ['Dehradun', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur'];
  const categories = [
    { name: 'All', icon: '' },
    { name: 'Business', icon: '' },
    { name: 'Freelance', icon: '' },
    { name: '18+', icon: '' }, 
    { name: 'Finance', icon: '' },
    { name: 'Travel', icon: '' },
    { name: 'More', icon: '' }
  ];
  
  const extraCategories = [
    // General Categories
    { name: 'Tech', icon: '💻' },
    { name: 'Education', icon: '🎓' },
    { name: 'Events', icon: '🎉' },
    { name: 'Real Estate', icon: '🏢' },
    { name: 'Health & Fitness', icon: '💪' },
    
    // Casual & Lifestyle
    { name: 'Food', icon: '🍛' },
    { name: 'Entertainment', icon: '🎬' },
    { name: 'Fashion & Beauty', icon: '👗' },
    { name: 'Automobile', icon: '🚗' },
    { name: 'Gaming', icon: '🎮' },
    
    // Community & Local Needs
    { name: 'Lost & Found', icon: '🧣' },
    { name: 'Social Causes', icon: '🤝' },
    { name: 'Buying & Selling', icon: '🛍️' },
    { name: 'Legal & Law', icon: '⚖️' },
    { name: 'Miscellaneous', icon: '📌' },
    { name: 'Housing', icon: '🏠' },
  ];

  // Sync local active category with the one passed from props
  useEffect(() => {
    setLocalActiveCategory(activeCategory);
  }, [activeCategory]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreDropdownRef]);
  
  const handleCategoryClick = (category) => {
    setLocalActiveCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    setMobileCategoriesOpen(false);
    setShowMoreDropdown(false);
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
      <nav className="bg-white border-b border-[#CBD5E1] w-full sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="font-bold text-2xl text-black font-['Inter']">
                Chowk
              </Link>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <MagnifyingGlass size={18} weight="bold" className="text-gray-400" />
                </div>
              </div>
            </form>
            
            {/* City Selector and Post Button */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <div 
                  className="flex items-center gap-1 cursor-pointer py-2 text-sm"
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                >
                  <MapPin size={16} weight="fill" className="text-gray-600" />
                  <span className="font-medium text-gray-800">{selectedCity}</span>
                  <CaretDown 
                    size={14} 
                    weight="bold"
                    className={`transition-transform duration-200 text-gray-600 ${showCityDropdown ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {showCityDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg w-48 z-50 max-h-60 overflow-y-auto border border-gray-100">
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
              
              <button 
                onClick={handlePostClick}
                className="bg-[#E1B845] text-gray-900 font-medium px-5 py-1.5 rounded-full hover:bg-yellow-400 transition-colors duration-200 text-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Category Navigation */}
      <div className="bg-white border-b border-[#CBD5E1] px-4 sticky top-[57px] z-40 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Mobile City Selector */}
            <div className="sm:hidden relative">
              <div 
                className="flex items-center gap-1 cursor-pointer py-3 text-sm"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
              >
                <MapPin size={16} weight="fill" className="text-gray-600" />
                <span className="font-medium text-gray-800">{selectedCity}</span>
                <CaretDown 
                  size={14} 
                  weight="bold"
                  className={`transition-transform duration-200 text-gray-600 ${showCityDropdown ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {showCityDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg w-48 z-50 max-h-60 overflow-y-auto border border-gray-100">
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
            
            {/* Category Filters */}
            <div className="flex-grow overflow-x-auto hide-scrollbar">
              <div className="flex space-x-6 py-1">
                {categories.map((category) => (
                  category.name === 'More' ? (
                    <div
                      key={category.name}
                      ref={moreDropdownRef}
                      className="relative"
                    >
                      <div 
                        onMouseEnter={() => setShowMoreDropdown(true)}
                        onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                        className={`
                          cursor-pointer py-2.5 whitespace-nowrap transition-all duration-200 text-sm
                          ${localActiveCategory === category.name ? 
                            'border-b-2 border-black font-medium text-black' : 
                            extraCategories.some(c => c.name === localActiveCategory) ?
                              'border-b-2 border-black font-medium text-black' :
                              'text-gray-600 hover:text-black'
                          }
                        `}
                      >
                        More
                      </div>
                      
                      {showMoreDropdown && (
                        <div 
                          id="more-dropdown-menu"
                          className="z-[9999] bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                          style={{
                            position: 'fixed',
                            top: `${moreDropdownRef.current ? moreDropdownRef.current.getBoundingClientRect().bottom + 4 : 100}px`,
                            left: `${moreDropdownRef.current ? moreDropdownRef.current.getBoundingClientRect().left - 100 : 0}px`,
                            width: '230px',
                            maxHeight: '380px',
                            overflowY: 'auto',
                          }}
                          onMouseLeave={() => setShowMoreDropdown(false)}
                        >
                          {/* Category sections */}
                          <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">General Categories</div>
                          {extraCategories.slice(0, 5).map((extraCategory) => (
                            <div
                              key={extraCategory.name}
                              onClick={() => handleCategoryClick(extraCategory.name)}
                              className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                                localActiveCategory === extraCategory.name ? 'font-medium bg-gray-50' : ''
                              }`}
                            >
                              {extraCategory.icon && <span className="mr-2">{extraCategory.icon}</span>}
                              {extraCategory.name}
                            </div>
                          ))}
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">Casual & Lifestyle</div>
                          {extraCategories.slice(5, 10).map((extraCategory) => (
                            <div
                              key={extraCategory.name}
                              onClick={() => handleCategoryClick(extraCategory.name)}
                              className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                                localActiveCategory === extraCategory.name ? 'font-medium bg-gray-50' : ''
                              }`}
                            >
                              {extraCategory.icon && <span className="mr-2">{extraCategory.icon}</span>}
                              {extraCategory.name}
                            </div>
                          ))}
                          
                          <div className="border-t border-gray-100 my-1"></div>
                          <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">Community & Local Needs</div>
                          {extraCategories.slice(10).map((extraCategory) => (
                            <div
                              key={extraCategory.name}
                              onClick={() => handleCategoryClick(extraCategory.name)}
                              className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                                localActiveCategory === extraCategory.name ? 'font-medium bg-gray-50' : ''
                              }`}
                            >
                              {extraCategory.icon && <span className="mr-2">{extraCategory.icon}</span>}
                              {extraCategory.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div 
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`
                        cursor-pointer py-2.5 whitespace-nowrap transition-all duration-200 text-sm
                        ${localActiveCategory === category.name ? 
                          'border-b-2 border-black font-medium text-black' : 
                          'text-gray-600 hover:text-black'
                        }
                      `}
                    >
                      {category.name}
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
