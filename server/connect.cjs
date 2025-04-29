const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chowk-me:chowk%401234@chowk-me.xnx3cyx.mongodb.net/?retryWrites=true&w=majority&appName=Chowk-me";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function getDatabase() {
  const client = await connectToDatabase();
  return client.db("chowk");
}

async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

async function closeConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  getCollection,
  closeConnection
};
