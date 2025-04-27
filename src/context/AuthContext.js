import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('chowk_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem('chowk_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  async function login(email, password) {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch('/users.json');
      const users = await response.json();
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Remove sensitive data before storing in state/localStorage
      const { password: _, ...userWithoutPassword } = user;
      
      // Save user to state and localStorage
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('chowk_user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Signup function
  async function signup(email, password, userData) {
    try {
      // In a real app, this would be an API call to your backend
      const response = await fetch('/users.json');
      const users = await response.json();
      
      // Check if username or email already exists
      if (users.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      if (users.some(u => u.username === userData.username)) {
        throw new Error('Username already taken');
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        email,
        password, // In a real app, this would be hashed
        ...userData,
        profilePic: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}?username=${userData.username}`,
        socialProfiles: {
          twitter: '',
          linkedin: '',
          github: '',
          instagram: ''
        }
      };
      
      // In a real app, we would save this to the database
      // For this demo app, let's store all users in localStorage so we can retrieve them later
      const localUsers = JSON.parse(localStorage.getItem('chowk_all_users') || '[]');
      localUsers.push(newUser);
      localStorage.setItem('chowk_all_users', JSON.stringify(localUsers));
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = newUser;
      
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('chowk_user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  // Logout function
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('chowk_user');
  }

  // Update user profile
  async function updateUserProfile(updatedData) {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }
      
      // Update local user data
      const updatedUser = {
        ...currentUser,
        ...updatedData
      };
      
      // Save updated user to current user in local storage
      setCurrentUser(updatedUser);
      localStorage.setItem('chowk_user', JSON.stringify(updatedUser));
      
      // Also update the user in the all users collection
      const allUsers = JSON.parse(localStorage.getItem('chowk_all_users') || '[]');
      const updatedAllUsers = allUsers.map(user => 
        user.id === currentUser.id || user.username === currentUser.username ? 
        { ...user, ...updatedData } : 
        user
      );
      localStorage.setItem('chowk_all_users', JSON.stringify(updatedAllUsers));
      
      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}