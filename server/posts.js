const { getCollection, closeConnection } = require('./connect.cjs');

async function getPostsByLocation(location) {
    try {
        const posts = await getCollection('post');
        const query = location ? { location: location } : {};
        const cursor = posts.find(query);
        const results = await cursor.toArray();
        return results;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    } finally {
        await closeConnection();
    }
}

async function getAllPosts() {
    try {
        const posts = await getCollection('post');
        const cursor = posts.find({});
        const results = await cursor.toArray();
        return results;
    } catch (error) {
        console.error("Error fetching all posts:", error);
        throw error;
    } finally {
        await closeConnection();
    }
}

async function getFeaturedPosts() {
    try {
        const posts = await getCollection('post');
        const cursor = posts.find({ featured: true });
        const results = await cursor.toArray();
        return results;
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        throw error;
    } finally {
        await closeConnection();
    }
}

async function getPostsByCategory(category) {
    try {
        const posts = await getCollection('post');
        const cursor = posts.find({ category: category });
        const results = await cursor.toArray();
        return results;
    } catch (error) {
        console.error("Error fetching posts by category:", error);
        throw error;
    } finally {
        await closeConnection();
    }
}

async function createPost(postData) {
    try {
        const posts = await getCollection('post');
        
        // Validate required fields
        const requiredFields = ['title', 'description', 'username', 'location', 'category', 'email'];
        for (const field of requiredFields) {
            if (!postData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Add default values for optional fields
        const newPost = {
            ...postData,
            featured: postData.featured || false,
            image: postData.image || 'https://picsum.photos/450/280',
            profilePic: postData.profilePic || `https://i.pravatar.cc/150?u=${postData.username}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await posts.insertOne(newPost);
        return { ...newPost, _id: result.insertedId };
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    } finally {
        await closeConnection();
    }
}

module.exports = {
    getPostsByLocation,
    getAllPosts,
    getFeaturedPosts,
    getPostsByCategory,
    createPost
}; 