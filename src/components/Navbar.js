import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlass, CaretDown, MapPin, List, X, User as UserIcon } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onCategorySelect, selectedCity, onCityChange, activeCategory = 'All', onPostClick }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [localActiveCategory, setLocalActiveCategory] = useState(activeCategory);
  const moreDropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  
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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
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
    if (!currentUser) {
      navigate('/login', { state: { redirect: '/create-post' } });
      return;
    }
    
    if (onPostClick) {
      onPostClick();
    } else {
      navigate('/create-post'); // Fallback to navigation if prop not provided
    }
    setMobileMenuOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
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
            
            {/* City Selector, Auth Menu, and Post Button */}
            <div className="flex items-center gap-4">
              {/* City Selector */}
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
              
              {/* Authentication UI */}
              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                  >
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={currentUser.profilePic || `https://avatar.iran.liara.run/public/17?username=${currentUser.username}`}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://avatar.iran.liara.run/public/17";
                        }}
                      />
                    </div>
                    <span className="hidden sm:block text-sm">{currentUser.name || currentUser.username}</span>
                    <CaretDown size={14} weight="bold" className="hidden sm:block text-gray-500" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-100">
                      <div className="p-3 border-b border-gray-100">
                        <p className="font-medium text-sm">@{currentUser.username}</p>
                        <p className="text-gray-500 text-sm truncate">{currentUser.email}</p>
                      </div>
                      <div className="py-1">
                        <Link 
                          to={`/${currentUser.username}`}
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Profile
                        </Link>
                        <Link 
                          to="/profile-settings"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link to="/login" className="text-gray-700 hover:text-black text-sm">
                    Sign in
                  </Link>
                  <Link to="/signup" className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                    Sign up
                  </Link>
                </div>
              )}
              
              {/* Post Button */}
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
            
            {/* Mobile Auth Links */}
            <div className="sm:hidden">
              {!currentUser ? (
                <Link to="/login" className="flex items-center gap-1 text-gray-600 py-2.5">
                  <UserIcon size={16} />
                  <span className="text-sm">Sign in</span>
                </Link>
              ) : (
                <Link to={`/${currentUser.username}`} className="flex items-center gap-1 text-gray-600 py-2.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={currentUser.profilePic || `https://avatar.iran.liara.run/public/17?username=${currentUser.username}`}
                      alt="User"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://avatar.iran.liara.run/public/17";
                      }}
                    />
                  </div>
                  <span className="text-sm">Profile</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
