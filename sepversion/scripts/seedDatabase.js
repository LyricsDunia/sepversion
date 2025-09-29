// Database Seeding Script
const { DatabaseConnection, mongoConfig } = require('../config/database');

const sampleProducts = [
  {
    _id: '1',
    name: 'iPhone 15 Pro',
    category: 'smartphones',
    brand: 'Apple',
    price: 134900,
    originalPrice: 139900,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    specifications: {
      processor: 'A17 Pro',
      camera: '48MP Triple Camera',
      storage: '128GB',
      display: '6.1-inch Super Retina XDR',
      battery: 'Up to 23 hours video playback'
    },
    features: ['Face ID', 'Wireless Charging', '5G', 'MagSafe'],
    trending: true,
    bestDeal: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    brand: 'Samsung',
    price: 129900,
    originalPrice: 134900,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    specifications: {
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP Quad Camera',
      storage: '256GB',
      display: '6.8-inch Dynamic AMOLED 2X',
      battery: '5000mAh'
    },
    features: ['S Pen', 'DeX Mode', '5G', 'Ultra Wideband'],
    trending: true,
    bestDeal: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'MacBook Air M2',
    category: 'laptops',
    brand: 'Apple',
    price: 114900,
    originalPrice: 124900,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    specifications: {
      processor: 'Apple M2',
      memory: '8GB Unified Memory',
      storage: '256GB SSD',
      display: '13.6-inch Liquid Retina',
      battery: 'Up to 18 hours'
    },
    features: ['Touch ID', 'MagSafe', 'Thunderbolt', 'macOS'],
    trending: false,
    bestDeal: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  const dbConnection = new DatabaseConnection();
  
  try {
    console.log('Connecting to database...');
    const connected = await dbConnection.connect();
    
    if (!connected) {
      throw new Error('Failed to connect to database');
    }

    // Clear existing data
    const productsCollection = dbConnection.getCollection(mongoConfig.collections.products);
    await productsCollection.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await productsCollection.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products`);

    // Create indexes for better performance
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ price: 1 });
    await productsCollection.createIndex({ name: 'text', brand: 'text' });
    console.log('Created database indexes');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    await dbConnection.disconnect();
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts };