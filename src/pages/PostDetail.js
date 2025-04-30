import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Link as LinkIcon } from 'phosphor-react';
import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import data from '../data/data.json';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use imported data directly instead of fetching
    const foundPost = data.find(p => p.id === parseInt(id));
    setPost(foundPost);
    setLoading(false);
  }, [id]);

  // ... rest of the component code ...
// ... existing code ...
} 