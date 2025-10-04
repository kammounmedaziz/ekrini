const { MongoClient } = require('mongodb');

class DatabaseConnection {
  constructor() {
    this.client = null;
    this.db = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      if (this.isConnected) {
        console.log('Database already connected');
        return this.db;
      }

      const uri = process.env.MONGODB_URI;
      const dbName = process.env.MONGODB_DB_NAME;

      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }

      if (!dbName) {
        throw new Error('MONGODB_DB_NAME environment variable is not set');
      }

      console.log('Connecting to MongoDB...');
      
      this.client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });

      await this.client.connect();
      await this.client.db('admin').command({ ping: 1 });
      
      this.db = this.client.db(dbName);
      this.isConnected = true;

      console.log(`✅ Connected to MongoDB database: ${dbName}`);
      return this.db;

    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.client && this.isConnected) {
        await this.client.close();
        this.isConnected = false;
        console.log('Disconnected from MongoDB');
      }
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error.message);
      throw error;
    }
  }

  getDatabase() {
    if (!this.isConnected || !this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  async healthCheck() {
    try {
      if (!this.isConnected || !this.client) {
        return { status: 'disconnected', message: 'Not connected to database' };
      }

      await this.client.db('admin').command({ ping: 1 });
      
      return { 
        status: 'connected', 
        message: 'Database connection is healthy',
        database: process.env.MONGODB_DB_NAME
      };
    } catch (error) {
      return { 
        status: 'error', 
        message: error.message 
      };
    }
  }
}

const dbConnection = new DatabaseConnection();
module.exports = dbConnection;