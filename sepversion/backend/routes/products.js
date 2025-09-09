const express = require('express');
const ProductModel = require('../models/Product');

const router = express.Router();

// Initialize routes with database
function initializeRoutes(db) {
  const productModel = new ProductModel(db);

  // GET /api/products
  router.get('/', async (req, res) => {
    try {
      const { category, search, limit = 20 } = req.query;
      let filters = {};
      
      if (category && category !== 'all') {
        filters.category = category;
      }
      
      let products;
      if (search) {
        products = await productModel.search(search);
      } else {
        products = await productModel.findAll(filters, { limit: parseInt(limit) });
      }
      
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // POST /api/products
  router.post('/', async (req, res) => {
    try {
      const product = await productModel.create(req.body);
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // GET /api/products/:id
  router.get('/:id', async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return router;
}

module.exports = initializeRoutes;