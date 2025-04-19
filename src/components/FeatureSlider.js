import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import PostCard from './PostCard';
import SkeletonLoader from './SkeletonLoader';

const FeatureSlider = ({ featuredPosts, loading = false }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-10 pt-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl md:text-2xl font-bold flex items-center text-text-primary">
            <Sparkles size={20} className="mr-2 text-yellow-500" />
            Today's Feature
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white hover:bg-gray-50 transition shadow-soft"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white hover:bg-gray-50 transition shadow-soft"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            <>
              <SkeletonLoader type="feature" />
              <SkeletonLoader type="feature" />
              <SkeletonLoader type="feature" />
            </>
          ) : (
            featuredPosts.map(post => (
              <div key={post.id} className="min-w-[300px] sm:min-w-[340px] flex-shrink-0">
                <PostCard post={post} isFeatured={true} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;