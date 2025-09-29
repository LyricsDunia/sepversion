// Express Server with MongoDB Integration
const express = require('express');

const path = require('path');
require('dotenv').config();

const { DatabaseConnection, mongoConfig } = require('../config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database connection
const dbConnection = new DatabaseConnection();

// Middleware

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Connect to MongoDB on startup
dbConnection.connect().then(connected => {
  if (connected) {
    console.log('Server ready with MongoDB connection');
  } else {
    console.log('Server started without database connection');
  }
});

// Products API Routes
app.get('/api/products', async (req, res) => {
  try {
    const collection = dbConnection.getCollection(mongoConfig.collections.products);
    const { category, minPrice, maxPrice, search } = req.query;
    
    let filter = {};
    if (category && category !== 'all') filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: parseInt(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await collection.find(filter).toArray();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const collection = dbConnection.getCollection(mongoConfig.collections.products);
    const product = await collection.findOne({ _id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const collection = dbConnection.getCollection(mongoConfig.collections.products);
    const productData = {
      ...req.body,
      _id: new Date().getTime().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await collection.insertOne(productData);
    res.json({ success: true, data: productData });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Price History API Routes
app.get('/api/price-history/:productId', async (req, res) => {
  try {
    const collection = dbConnection.getCollection(mongoConfig.collections.priceHistory);
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const history = await collection.find({
      productId: req.params.productId,
      date: { $gte: startDate }
    }).sort({ date: 1 }).toArray();
    
    res.json({ success: true, data: history });
  } catch (error) {
    console.error('Price history fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await dbConnection.disconnect();
  process.exit(0);
});

module.exports = app;