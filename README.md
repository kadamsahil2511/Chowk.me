# Chowk.me

A hyperlocal digital noticeboard / marketplace for Indian cities like Dehradun.

## About

Chowk.me is a platform like a mix of OLX + Instagram + Reddit, where users can post things like:
- Events
- Concerts
- Freelance gigs
- Business help
- Food deals
- Selling stuff
- Lost & found
- Study material
- Travel plans
- Giveaways

## Tech Stack

- React (Functional components)
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

## Features

- **Modern UI**: Clean, minimal and mobile-first design
- **Responsive Layout**: Works well on mobile and desktop
- **Category Filtering**: Filter posts by different categories
- **Featured Posts**: Highlighted posts in the "Today's Feature" section
- **Local Information**: All posts are tied to a location (Dehradun by default)

## Getting Started

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
npm start
```

## Project Structure

```
src/
  components/         # Reusable UI components
    Navbar.js         # Top navigation bar
    Footer.js         # Site footer
    PostCard.js       # Card component for posts
    CategoryFilter.js # Category filtering component
    FeatureSlider.js  # Horizontal slider for featured posts
  pages/
    Home.js           # Main page showing all content
  utils/
    imagePlaceholders.js # Utility for placeholder images
  App.js              # Main app component with routing
  index.js            # Entry point
```

## Future Improvements

- Authentication for user accounts
- Post creation form
- Comments and reactions
- Real-time notifications
- Backend API integration
- Search functionality
- User profiles
