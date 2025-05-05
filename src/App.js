// Remove the unused import
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostFormModal from './components/PostFormModal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
// Remove: import User from './pages/User/User';
import Profile from './pages/User/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSettings from './pages/ProfileSettings';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Dehradun'); // Default city
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  // Handle modal close event
  const handleModalClose = (success = false) => {
    setIsPostModalOpen(false);
    if (success) {
      setPostCreated(true);
      // Reset post created notification after a delay
      setTimeout(() => setPostCreated(false), 5000);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Authentication routes - these don't show the navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile-settings" 
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Public routes with shared layout */}
            <Route path="*" element={
              <>
                <Navbar 
                  onCategorySelect={setSelectedCategory} 
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  onPostClick={() => setIsPostModalOpen(true)}
                  activeCategory={selectedCategory}
                />
                <main className="flex-grow pt-6">
                  <Routes>
                    <Route path="/" element={<Home selectedCategory={selectedCategory} selectedCity={selectedCity} postCreated={postCreated} />} />
                    <Route path="/create-post" element={<CreatePost defaultCity={selectedCity} />} />
                    <Route path="/:username" element={<Profile />} />
                    {/* Additional routes can be added here */}
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
          
          {/* Post creation modal */}
          <PostFormModal 
            isOpen={isPostModalOpen} 
            onClose={handleModalClose} 
            defaultCity={selectedCity} 
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
