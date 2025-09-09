const aiAgent = {
  async generateRecommendations(userQuery, preferences = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = this.generateMockResponse(userQuery, preferences);
      
      return {
        success: true,
        recommendations: response,
        confidence: Math.random() * 0.3 + 0.7
      };
    } catch (error) {
      console.error('AI recommendation error:', error);
      return {
        success: false,
        error: 'Unable to generate recommendations at this time'
      };
    }
  },

  generateMockResponse(userQuery, preferences = {}) {
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('smartphone') || lowerQuery.includes('phone')) {
      return "**Top Smartphone Recommendations:**\n1. **iPhone 15 Pro** - Excellent camera and performance\n2. **Samsung Galaxy S24 Ultra** - Best Android option\n3. **Google Pixel 8 Pro** - Great AI features";
    } else if (lowerQuery.includes('laptop')) {
      return "**Top Laptop Recommendations:**\n1. **MacBook Air M2** - Best performance and battery\n2. **Dell XPS 13** - Premium Windows ultrabook\n3. **ThinkPad X1 Carbon** - Best for business";
    }
    
    return "Based on your requirements, I recommend checking our featured products section for detailed comparisons and reviews.";
  }
};

window.aiAgent = aiAgent;