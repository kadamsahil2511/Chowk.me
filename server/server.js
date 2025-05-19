const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://chowk-me:chowk%401234@chowk-me.xnx3cyx.mongodb.net/?retryWrites=true&w=majority&appName=Chowk-me";
const JWT_SECRET = 'your-jwt-secret-key'; // In production, use environment variable
const GOOGLE_CLIENT_ID = 'your-google-client-id'; // Replace with your Google Client ID

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("chowk-me");
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Initialize database connection
connectToDatabase();

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email ? 'Email already in use' : 'Username already taken' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      email,
      username,
      password: hashedPassword,
      profilePic: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}?username=${username}`,
      createdAt: new Date().toISOString()
    };
    
    const result = await db.collection('users').insertOne(newUser);
    
    // Generate JWT
    const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: { ...userWithoutPassword, _id: result.insertedId },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    
    // Check if user exists
    let user = await db.collection('users').findOne({ email });
    
    if (!user) {
      // Create new user
      const newUser = {
        email,
        username: name.toLowerCase().replace(/\s+/g, ''),
        profilePic: picture,
        googleId: payload.sub,
        createdAt: new Date().toISOString()
      };
      
      const result = await db.collection('users').insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }
    
    // Generate JWT
    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET);
    
    res.json({
      user,
      token: jwtToken
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

// Protected routes
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// Routes for posts
app.post('/api/posts', async (req, res) => {
  try {
    const collection = db.collection('posts');
    const post = {
      ...req.body,
      timestamp: new Date().toISOString(),
      featured: false
    };
    const result = await collection.insertOne(post);
    res.status(201).json({ ...post, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const collection = db.collection('posts');
    const { category, location } = req.query;
    
    // Build query based on filters
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }
    
    const posts = await collection
      .find(query)
      .sort({ timestamp: -1 })
      .toArray();
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const collection = db.collection('posts');
    const post = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.get('/api/posts/user/:username', async (req, res) => {
  try {
    const collection = db.collection('posts');
    const posts = await collection
      .find({ username: req.params.username })
      .sort({ timestamp: -1 })
      .toArray();
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
