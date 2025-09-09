const youtubeAPI = {
  async searchProductReviews(productName, maxResults = 5) {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockVideos = [
        {
          id: 'video1',
          title: `${productName} Review - Detailed Analysis`,
          channelTitle: 'Tech Reviewer',
          thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
          url: 'https://youtube.com/watch?v=sample1',
          viewCount: '1.2M views',
          duration: '12:45',
          publishedAt: '2024-01-15'
        },
        {
          id: 'video2',
          title: `${productName} Unboxing & First Impressions`,
          channelTitle: 'Gadget Guru',
          thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
          url: 'https://youtube.com/watch?v=sample2',
          viewCount: '850K views',
          duration: '8:30',
          publishedAt: '2024-01-20'
        }
      ];
      
      return {
        success: true,
        videos: mockVideos.slice(0, maxResults)
      };
    } catch (error) {
      console.error('YouTube search error:', error);
      return {
        success: false,
        error: 'Unable to fetch YouTube reviews'
      };
    }
  }
};

window.youtubeAPI = youtubeAPI;