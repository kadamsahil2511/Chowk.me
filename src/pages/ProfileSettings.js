import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSimple, MapPin, GithubLogo, LinkedinLogo, InstagramLogo, TwitterLogo } from 'phosphor-react';
import { ArrowLeft, User, Link as LinkIcon, Mail, AlertCircle, Upload, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    email: '',
    link: '',
    socialProfiles: {
      twitter: '',
      github: '',
      instagram: '',
      linkedin: ''
    }
  });
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Load user data when component mounts
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        email: currentUser.email || '',
        link: currentUser.link || '',
        socialProfiles: {
          twitter: currentUser.socialProfiles?.twitter || '',
          github: currentUser.socialProfiles?.github || '',
          instagram: currentUser.socialProfiles?.instagram || '',
          linkedin: currentUser.socialProfiles?.linkedin || ''
        }
      });
      
      // Set profile picture preview if available
      if (currentUser.profilePic) {
        setProfilePicPreview(currentUser.profilePic);
      }
    }
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested social profile fields
    if (name.startsWith('social_')) {
      const socialPlatform = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socialProfiles: {
          ...prev.socialProfiles,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // In a real app, you would upload the profile picture to a storage service
      // For this example, we'll just simulate that and use the Data URL
      let profilePicUrl = currentUser.profilePic;
      if (profilePicture && profilePicPreview) {
        // Simulate upload - in production this would be uploaded to a storage service
        profilePicUrl = profilePicPreview;
      }
      
      // Update profile
      await updateUserProfile({
        ...formData,
        profilePic: profilePicUrl
      });
      
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          
          <div className="w-16"></div> {/* Empty div for flex spacing */}
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Save size={20} className="text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h2>
              
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <img 
                    src={profilePicPreview || `https://avatar.iran.liara.run/public/${currentUser?.username ? Math.abs(currentUser.username.charCodeAt(0) % 100) : '17'}?username=${currentUser?.username || 'user'}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="profile-pic"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <Upload size={16} className="mr-2" />
                    Change profile picture
                  </label>
                  <input
                    id="profile-pic"
                    name="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="sr-only"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: Square JPG, PNG. Max 2MB.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="link"
                      name="link"
                      type="url"
                      value={formData.link}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <PencilSimple size={18} className="text-gray-400" />
                    </div>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="Write a short bio about yourself..."
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Brief description for your profile.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Social Profiles</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="social_twitter" className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TwitterLogo size={18} className="text-gray-400" />
                    </div>
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                      <span className="text-gray-500">@</span>
                    </div>
                    <input
                      id="social_twitter"
                      name="social_twitter"
                      type="text"
                      value={formData.socialProfiles.twitter}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-14 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="social_github" className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GithubLogo size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="social_github"
                      name="social_github"
                      type="text"
                      value={formData.socialProfiles.github}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="social_linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkedinLogo size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="social_linkedin"
                      name="social_linkedin"
                      type="text"
                      value={formData.socialProfiles.linkedin}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="social_instagram" className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <InstagramLogo size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="social_instagram"
                      name="social_instagram"
                      type="text"
                      value={formData.socialProfiles.instagram}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;