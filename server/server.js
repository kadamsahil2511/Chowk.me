const express = require('express');
const cors = require('cors');
const { getPostsByLocation, getAllPosts, getFeaturedPosts, getPostsByCategory, createPost } = require('./posts');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoint to get posts by location
app.get('/api/posts', async (req, res) => {
    try {
        const { location, category } = req.query;
        let posts;
        
        if (location) {
            posts = await getPostsByLocation(location);
        } else if (category) {
            posts = await getPostsByCategory(category);
        } else {
            posts = await getAllPosts();
        }
        
        res.json(posts);
    } catch (error) {
        console.error('Error in /api/posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// API endpoint to get featured posts
app.get('/api/posts/featured', async (req, res) => {
    try {
        const posts = await getFeaturedPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error in /api/posts/featured:', error);
        res.status(500).json({ error: 'Failed to fetch featured posts' });
    }
});

// API endpoint to get posts by category
app.get('/api/posts/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const posts = await getPostsByCategory(category);
        res.json(posts);
    } catch (error) {
        console.error('Error in /api/posts/category:', error);
        res.status(500).json({ error: 'Failed to fetch posts by category' });
    }
});

// API endpoint to create a new post
app.post('/api/posts', async (req, res) => {
    try {
        const postData = req.body;
        const newPost = await createPost(postData);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in POST /api/posts:', error);
        if (error.message.includes('Missing required field')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create post' });
        }
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 