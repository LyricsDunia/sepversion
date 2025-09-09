// Local data storage utility to replace Trickle database functionality
const dataStorage = {
  // Initialize with sample data
  initializeData() {
    if (!localStorage.getItem('products')) {
      const sampleProducts = [
        {
          objectId: '1',
          objectData: {
            name: 'iPhone 15 Pro',
            category: 'smartphones',
            price: '134900',
            originalPrice: '144900',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
            trending: true,
            bestDeal: false,
            brand: 'Apple',
            specifications: JSON.stringify({
              processor: 'A17 Pro',
              camera: '48MP',
              storage: '128GB',
              display: '6.1-inch Super Retina XDR'
            })
          }
        },
        {
          objectId: '2',
          objectData: {
            name: 'Samsung Galaxy S24 Ultra',
            category: 'smartphones',
            price: '129900',
            originalPrice: '139900',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
            trending: true,
            bestDeal: true,
            brand: 'Samsung',
            specifications: JSON.stringify({
              processor: 'Snapdragon 8 Gen 3',
              camera: '200MP',
              storage: '256GB',
              display: '6.8-inch Dynamic AMOLED 2X'
            })
          }
        },
        {
          objectId: '3',
          objectData: {
            name: 'MacBook Air M2',
            category: 'laptops',
            price: '114900',
            originalPrice: '124900',
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
            trending: false,
            bestDeal: true,
            brand: 'Apple',
            specifications: JSON.stringify({
              processor: 'Apple M2',
              memory: '8GB RAM',
              storage: '256GB SSD',
              display: '13.6-inch Liquid Retina'
            })
          }
        },
        {
          objectId: '4',
          objectData: {
            name: 'Sony WH-1000XM5',
            category: 'headphones',
            price: '29990',
            originalPrice: '34990',
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
            trending: true,
            bestDeal: false,
            brand: 'Sony',
            specifications: JSON.stringify({
              type: 'Over-ear',
              battery: '30 hours',
              connectivity: 'Bluetooth 5.2',
              noiseCancelling: 'Active'
            })
          }
        },
        {
          objectId: '5',
          objectData: {
            name: 'iPad Air',
            category: 'tablets',
            price: '54990',
            originalPrice: '59990',
            rating: 4.4,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
            trending: false,
            bestDeal: true,
            brand: 'Apple',
            specifications: JSON.stringify({
              processor: 'Apple M1',
              display: '10.9-inch Liquid Retina',
              storage: '64GB',
              connectivity: 'Wi-Fi'
            })
          }
        }
      ];
      
      localStorage.setItem('products', JSON.stringify(sampleProducts));
      localStorage.setItem('missing_product_alerts', JSON.stringify([]));
      localStorage.setItem('email_alerts', JSON.stringify([]));
    }
  },

  // Simulate trickleListObjects
  async listObjects(objectType, limit = 100, descent = true) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
    
    const data = JSON.parse(localStorage.getItem(objectType) || '[]');
    let items = data.slice(0, limit);
    
    if (descent) {
      items = items.reverse();
    }
    
    return {
      items: items,
      nextPageToken: null
    };
  },

  // Simulate trickleCreateObject
  async createObject(objectType, objectData) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = JSON.parse(localStorage.getItem(objectType) || '[]');
    const newObject = {
      objectId: Date.now().toString(),
      objectType: objectType,
      objectData: objectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    data.push(newObject);
    localStorage.setItem(objectType, JSON.stringify(data));
    
    return newObject;
  },

  // Simulate trickleUpdateObject
  async updateObject(objectType, objectId, objectData) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = JSON.parse(localStorage.getItem(objectType) || '[]');
    const index = data.findIndex(item => item.objectId === objectId);
    
    if (index !== -1) {
      data[index].objectData = objectData;
      data[index].updatedAt = new Date().toISOString();
      localStorage.setItem(objectType, JSON.stringify(data));
      return data[index];
    }
    
    throw new Error('Object not found');
  },

  // Simulate trickleGetObject
  async getObject(objectType, objectId) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = JSON.parse(localStorage.getItem(objectType) || '[]');
    const item = data.find(item => item.objectId === objectId);
    
    if (!item) {
      throw new Error('Object not found');
    }
    
    return item;
  },

  // Simulate trickleDeleteObject
  async deleteObject(objectType, objectId) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const data = JSON.parse(localStorage.getItem(objectType) || '[]');
    const filteredData = data.filter(item => item.objectId !== objectId);
    localStorage.setItem(objectType, JSON.stringify(filteredData));
  }
};

// Initialize data when the script loads
dataStorage.initializeData();

// Expose functions globally to replace Trickle database calls
window.trickleListObjects = dataStorage.listObjects.bind(dataStorage);
window.trickleCreateObject = dataStorage.createObject.bind(dataStorage);
window.trickleUpdateObject = dataStorage.updateObject.bind(dataStorage);
window.trickleGetObject = dataStorage.getObject.bind(dataStorage);
window.trickleDeleteObject = dataStorage.deleteObject.bind(dataStorage);