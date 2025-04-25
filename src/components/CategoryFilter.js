import React, { useState, useRef, useEffect } from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  const [showMore, setShowMore] = useState(false);
  const moreMenuRef = useRef(null);

  // Category icons mapping
  const categoryIcons = {
    'All': '🧃',
    'Business': '💼',
    'Freelance': '💻',
    'Travel': '🧳',
    '18+': '🔞',
    'Finance': '💰',
    'Tech': '💻',
    'Education': '🎓',
    'Events': '🎉',
    'Real Estate': '🏢',
    'Health & Fitness': '💪',
    'Food': '🍛',
    'Entertainment': '🎬',
    'Fashion & Beauty': '👗',
    'Automobile': '🚗',
    'Gaming': '🎮',
    'Lost & Found': '🧣',
    'Social Causes': '🤝',
    'Buying & Selling': '🛍️',
    'Legal & Law': '⚖️',
    'Miscellaneous': '📌',
    'Sale': '🛍️',
    'Housing': '🏠',
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Find the index of 'More' in the categories array
  const moreIndex = categories.indexOf('More');
  
  // Determine which categories to show in main view vs dropdown
  const visibleCategories = moreIndex !== -1 ? 
    categories.slice(0, moreIndex + 1) : 
    categories.slice(0, 6);
  
  // Get categories that should be in the dropdown
  // This includes all categories after "More" and any extra categories not in the main list
  const dropdownCategories = moreIndex !== -1 ? 
    categories.slice(moreIndex + 1) : 
    categories.slice(6);
    
  // Group dropdown categories for better organization
  const generalCategories = ['Tech', 'Education', 'Events', 'Real Estate', 'Health & Fitness'];
  const casualCategories = ['Food', 'Entertainment', 'Fashion & Beauty', 'Automobile', 'Gaming'];
  const communityCategories = ['Lost & Found', 'Social Causes', 'Buying & Selling', 'Legal & Law', 'Miscellaneous', 'Housing', 'Sale'];

  // Filter dropdown categories into groups
  const getGroupedCategories = (group) => {
    return dropdownCategories.filter(category => group.includes(category));
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMore(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreMenuRef]);

  return (
    <div className="overflow-x-auto pb-2 mb-4">
      <div className="flex gap-3 whitespace-nowrap">
        {visibleCategories.map((category) => (
          category !== 'More' ? (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-pill text-sm transition-all shadow-soft flex items-center ${
                activeCategory === category
                  ? 'bg-black text-white transform scale-105 font-medium'
                  : 'bg-white hover:bg-gray-50 text-text-secondary'
              }`}
            >
              <span className="mr-2">{categoryIcons[category] || '🧃'}</span>
              {category}
            </button>
          ) : (
            <div className="relative" ref={moreMenuRef} key={category}>
              <button
                onMouseEnter={() => setShowMore(true)}
                onClick={() => setShowMore(!showMore)}
                className={`px-4 py-2 rounded-pill text-sm transition-all shadow-soft flex items-center ${
                  showMore || dropdownCategories.includes(activeCategory)
                    ? 'bg-black text-white font-medium'
                    : 'bg-white hover:bg-gray-50 text-text-secondary'
                }`}
              >
                <span className="mr-2">⋯</span>
                More
              </button>
              
              {showMore && (
                <div 
                  className="absolute z-[999] bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                  onMouseLeave={() => setShowMore(false)}
                  style={{ 
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '230px',
                    maxHeight: '380px',
                    overflowY: 'auto',
                    marginTop: '0.5rem'
                  }}
                >
                  {/* General Categories */}
                  <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">General Categories</div>
                  {getGroupedCategories(generalCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        handleCategoryClick(category);
                        setShowMore(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">{categoryIcons[category] || '🧃'}</span>
                      {category}
                    </button>
                  ))}
                  
                  {/* Casual & Lifestyle */}
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">Casual & Lifestyle</div>
                  {getGroupedCategories(casualCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        handleCategoryClick(category);
                        setShowMore(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">{categoryIcons[category] || '🧃'}</span>
                      {category}
                    </button>
                  ))}
                  
                  {/* Community & Local Needs */}
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">Community & Local Needs</div>
                  {getGroupedCategories(communityCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        handleCategoryClick(category);
                        setShowMore(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">{categoryIcons[category] || '🧃'}</span>
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;