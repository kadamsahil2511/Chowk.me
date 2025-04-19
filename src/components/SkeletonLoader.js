import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  // Function to render different skeleton types
  const renderSkeleton = () => {
    switch(type) {
      case 'feature':
        return (
          <div className="min-w-[300px] sm:min-w-[340px] flex-shrink-0">
            <div className="bg-white rounded-card overflow-hidden shadow-card">
              {/* Image placeholder */}
              <div className="w-full h-48 sm:h-56 bg-gray-200 animate-pulse"></div>
              <div className="p-5">
                {/* User info placeholder */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="ml-2 w-20 h-4 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
                </div>
                {/* Title placeholder */}
                <div className="w-3/4 h-6 bg-gray-200 animate-pulse mb-2"></div>
                {/* Description placeholder */}
                <div className="w-full h-4 bg-gray-200 animate-pulse mb-1.5"></div>
                <div className="w-2/3 h-4 bg-gray-200 animate-pulse mb-4"></div>
                {/* Footer placeholder */}
                <div className="flex items-center justify-between">
                  <div className="w-20 h-6 rounded-pill bg-gray-200 animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'card':
      default:
        return (
          <div className="bg-white rounded-card overflow-hidden shadow-card">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-5">
              {/* User info placeholder */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="ml-2 w-20 h-4 bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
              </div>
              {/* Title placeholder */}
              <div className="w-3/4 h-6 bg-gray-200 animate-pulse mb-2"></div>
              {/* Description placeholder */}
              <div className="w-full h-4 bg-gray-200 animate-pulse mb-1.5"></div>
              <div className="w-2/3 h-4 bg-gray-200 animate-pulse mb-4"></div>
              {/* Footer placeholder */}
              <div className="flex items-center justify-between">
                <div className="w-20 h-6 rounded-pill bg-gray-200 animate-pulse"></div>
                <div className="w-12 h-4 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  // Generate multiple skeletons if count > 1
  if (count > 1) {
    return (
      <>{Array(count).fill(null).map((_, i) => (
        <React.Fragment key={`skeleton-${i}`}>{renderSkeleton()}</React.Fragment>
      ))}</>
    );
  }
  
  return renderSkeleton();
};

export default SkeletonLoader;