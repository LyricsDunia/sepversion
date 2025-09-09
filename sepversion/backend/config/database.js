const { MongoClient } = require('mongodb');

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/gadget-finder';
      this.client = new MongoClient(mongoUrl);
      await this.client.connect();
      this.db = this.client.db('gadget-finder');
      console.log('Connected to MongoDB');
      return this.db;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }

  getDatabase() {
    return this.db;
  }
}

module.exports = new Database();