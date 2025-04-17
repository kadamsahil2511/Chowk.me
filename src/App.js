import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('Dehradun'); // Default city

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar 
          onCategorySelect={setSelectedCategory} 
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
        <main className="flex-grow pt-6">
          <Routes>
            <Route path="/" element={<Home selectedCategory={selectedCategory} selectedCity={selectedCity} />} />
            <Route path="/create-post" element={<CreatePost defaultCity={selectedCity} />} />
            {/* Additional routes can be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
