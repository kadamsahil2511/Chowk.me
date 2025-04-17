/**
 * This utility generates placeholder image URLs from Picsum Photos API
 * for posts in our application
 */

export const getPlaceholderImage = (category, size = { width: 400, height: 250 }) => {
  const { width, height } = size;
  
  // Use category-specific seeds for consistent images per category
  const categorySeeds = {
    'Business': 'business',
    'Freelance': 'freelance',
    'Travel': 'travel',
    'Sale': 'sale',
    'Events': 'event',
    'Education': 'education',
    'Lost': 'lost',
    'Food': 'food',
    'Housing': 'housing',
    'default': 'india'
  };
  
  // Get the seed based on category or use default
  const seed = categorySeeds[category] || categorySeeds.default;
  
  // Generate a random ID for truly random images
  const randomId = Math.floor(Math.random() * 1000);
  
  // Choose between random image or category-seeded image (80% chance of category-based)
  if (Math.random() < 0.8) {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
  } else {
    return `https://picsum.photos/id/${randomId}/${width}/${height}`;
  }
};

// Generate random dimensions for more visual variety
export const getRandomDimensions = () => {
  // Width between 300-600px, height between 200-400px
  // Keeping a reasonable aspect ratio for cards
  const width = Math.floor(Math.random() * 300) + 300;
  const height = Math.floor(Math.random() * 200) + 200;
  
  return { width, height };
};

export default getPlaceholderImage;