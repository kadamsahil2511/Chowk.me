import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  // Category icons mapping
  const categoryIcons = {
    'All': '🧃',
    'Business': '💼',
    'Freelance': '💻',
    'Travel': '🧳',
    'Sale': '🛍️',
    'Events': '🎉',
    'Education': '🎓',
    'Lost': '🧣',
    'Food': '🍛',
    'Housing': '🏠',
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="overflow-x-auto pb-2 mb-4">
      {/* <div className="flex gap-3 whitespace-nowrap">
        {categories.map((category) => (
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
        ))}
      </div> */}
    </div>
  );
};

export default CategoryFilter;