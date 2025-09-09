const priceAPI = {
  async fetchPrices(productId, productName) {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockPrices = [
        {
          retailer: 'Amazon India',
          price: Math.floor(Math.random() * 10000) + 25000,
          shipping: Math.random() > 0.5 ? 'Free' : '₹99',
          inStock: Math.random() > 0.1,
          rating: (Math.random() * 1 + 4).toFixed(1),
          affiliateLink: `#amazon-${productId}`,
          lastUpdated: new Date().toISOString()
        },
        {
          retailer: 'Flipkart',
          price: Math.floor(Math.random() * 10000) + 26000,
          shipping: Math.random() > 0.3 ? 'Free' : '₹149',
          inStock: Math.random() > 0.15,
          rating: (Math.random() * 1 + 4).toFixed(1),
          affiliateLink: `#flipkart-${productId}`,
          lastUpdated: new Date().toISOString()
        }
      ];
      
      return {
        success: true,
        prices: mockPrices.sort((a, b) => a.price - b.price),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Price fetch error:', error);
      return {
        success: false,
        error: 'Unable to fetch current prices'
      };
    }
  }
};

window.priceAPI = priceAPI;