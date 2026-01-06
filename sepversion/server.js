const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

// MongoDB connection
let db;
const mongoUrl =
  process.env.MONGODB_URI || "mongodb://localhost:27017/smarteinsDB";

// Connect to MongoDB FIRST, then start server
MongoClient.connect(mongoUrl)
  .then(client => {
    console.log("Connected to MongoDB");

    // ✅ CORRECT database name (case-sensitive)
    db = client.db("smarteinsDB");

    initializeData();

    // ✅ Start server ONLY ONCE
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Initialize sample data
async function initializeData() {
  try {
    const productsCount = await db
      .collection("products")
      .countDocuments();

    if (productsCount === 0) {
      await db.collection("products").insertMany([
        {
          name: "iPhone 15 Pro",
          category: "smartphones",
          price: 134900,
          originalPrice: 144900,
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
          trending: true,
          bestDeal: false,
          brand: "Apple",
          specifications: {
            processor: "A17 Pro",
            camera: "48MP",
            storage: "128GB",
            display: "6.1-inch Super Retina XDR"
          },
          createdAt: new Date()
        },
        {
          name: "Samsung Galaxy S24 Ultra",
          category: "smartphones",
          price: 129900,
          originalPrice: 139900,
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
          trending: true,
          bestDeal: true,
          brand: "Samsung",
          specifications: {
            processor: "Snapdragon 8 Gen 3",
            camera: "200MP",
            storage: "256GB",
            display: "6.8-inch Dynamic AMOLED 2X"
          },
          createdAt: new Date()
        }
      ]);

      console.log("Sample data initialized");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}

// API Routes
app.get("/api/products", async (req, res) => {
  try {
    const { category, limit = 20 } = req.query;
    const filter =
      category && category !== "all" ? { category } : {};

    const products = await db
      .collection("products")
      .find(filter)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = {
      ...req.body,
      createdAt: new Date()
    };

    const result = await db
      .collection("products")
      .insertOne(product);

    res.json({
      success: true,
      productId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "index.html")
  );
});
