import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  // Function to render different skeleton types
  const renderSkeleton = () => {
    switch(type) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile picture placeholder */}
              <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse"></div>
              
              {/* User info placeholders */}
              <div className="flex-grow text-center md:text-left">
                <div className="w-48 h-8 bg-gray-200 animate-pulse mb-4 mx-auto md:mx-0"></div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-5 h-5 bg-gray-200 animate-pulse mr-2"></div>
                    <div className="w-40 h-4 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-5 h-5 bg-gray-200 animate-pulse mr-2"></div>
                    <div className="w-32 h-4 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="w-5 h-5 bg-gray-200 animate-pulse mr-2"></div>
                    <div className="w-56 h-4 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
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