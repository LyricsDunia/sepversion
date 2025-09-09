// YouTube API utility for fetching and summarizing product reviews
const youtubeAPI = {
  async searchProductReviews(productName, maxResults = 5) {
    try {
      // Simulate YouTube search API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate specific content for Samsung S24 Ultra and other popular products
      const mockVideos = [];
      
      if (productName.toLowerCase().includes('samsung') && productName.toLowerCase().includes('s24')) {
        mockVideos.push(
          {
            id: 'samsung_s24_1',
            title: 'Samsung Galaxy S24 Ultra Review - The Ultimate Camera Phone?',
            channelTitle: 'MKBHD',
            thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
            url: 'https://youtube.com/watch?v=samsung_s24_review',
            viewCount: '3.2M views',
            duration: '15:42',
            publishedAt: '2024-02-01'
          },
          {
            id: 'samsung_s24_2',
            title: 'Galaxy S24 Ultra Camera Test - 200MP vs iPhone 15 Pro Max',
            channelTitle: 'Peter McKinnon',
            thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
            url: 'https://youtube.com/watch?v=s24_camera_test',
            viewCount: '1.8M views',
            duration: '12:33',
            publishedAt: '2024-02-05'
          },
          {
            id: 'samsung_s24_3',
            title: 'S24 Ultra After 30 Days - Real World Performance',
            channelTitle: 'Dave2D',
            thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
            url: 'https://youtube.com/watch?v=s24_30days',
            viewCount: '2.1M views',
            duration: '11:28',
            publishedAt: '2024-02-15'
          }
        );
      } else {
        mockVideos.push(
          {
            id: 'video1',
            title: `${productName} Review - Detailed Analysis`,
            channelTitle: 'Tech Reviewer',
            thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
            url: `https://youtube.com/watch?v=sample1`,
            viewCount: '1.2M views',
            duration: '12:45',
            publishedAt: '2024-01-15'
          },
          {
            id: 'video2',
            title: `${productName} Unboxing & First Impressions`,
            channelTitle: 'Gadget Guru',
            thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
            url: `https://youtube.com/watch?v=sample2`,
            viewCount: '850K views',
            duration: '8:30',
            publishedAt: '2024-01-20'
          },
          {
            id: 'video3',
            title: `${productName} vs Competition - Which to Buy?`,
            channelTitle: 'Tech Comparison',
            thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
            url: `https://youtube.com/watch?v=sample3`,
            viewCount: '650K views',
            duration: '15:20',
            publishedAt: '2024-01-25'
          }
        );
      }
      
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
  },

  async summarizeVideoContent(videoId, videoTitle) {
    try {
      // Simulate video content analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Provide specific summaries for Samsung S24 Ultra
      if (videoId.includes('samsung_s24')) {
        const s24Summaries = {
          'samsung_s24_1': 'Comprehensive review highlighting the S24 Ultra\'s exceptional 200MP camera system, improved S Pen functionality, and titanium build quality. Pros include outstanding zoom capabilities and bright display. Cons mentioned are high price point and battery life under heavy usage.',
          'samsung_s24_2': 'Detailed camera comparison showing S24 Ultra\'s 200MP sensor performance against iPhone 15 Pro Max. S24 Ultra excels in zoom photography and low-light scenarios. Video stabilization and portrait mode quality are significantly improved over previous generation.',
          'samsung_s24_3': 'Real-world usage after 30 days reveals excellent performance consistency, great battery optimization after updates, and impressive AI features. Some heating issues during gaming noted. Overall recommendation for power users and photography enthusiasts.'
        };
        
        return {
          success: true,
          summary: s24Summaries[videoId] || 'Detailed analysis of Samsung Galaxy S24 Ultra features and performance.',
          keyPoints: this.extractKeyPoints(s24Summaries[videoId] || '')
        };
      }
      
      const systemPrompt = `You are an AI that summarizes YouTube product review videos. Based on the video title, provide a concise summary of what the reviewer likely discussed about the product, including pros, cons, and key points.`;
      
      const userPrompt = `Video title: "${videoTitle}". Provide a summary of the key points likely covered in this product review video.`;
      
      const summary = this.generateMockSummary(videoTitle);
      
      return {
        success: true,
        summary: summary,
        keyPoints: this.extractKeyPoints(summary)
      };
    } catch (error) {
      console.error('Video summarization error:', error);
      return {
        success: false,
        error: 'Unable to summarize video content'
      };
    }
  },

  generateMockSummary(videoTitle) {
    const lowerTitle = videoTitle.toLowerCase();
    
    if (lowerTitle.includes('samsung') && lowerTitle.includes('s24')) {
      return 'Comprehensive review of Samsung Galaxy S24 Ultra highlighting the exceptional 200MP camera system, improved S Pen functionality, and premium titanium build. The reviewer praises outstanding zoom capabilities, bright display quality, and enhanced AI features. Some concerns noted about battery life during intensive gaming and the premium price point.';
    } else if (lowerTitle.includes('iphone') && lowerTitle.includes('15')) {
      return 'Detailed analysis of iPhone 15 Pro focusing on the new A17 Pro chip performance, upgraded camera system with improved night mode, and titanium design. Reviewer highlights excellent build quality, iOS stability, and camera versatility. Battery life and charging speed improvements are also discussed.';
    } else if (lowerTitle.includes('macbook') || lowerTitle.includes('laptop')) {
      return 'In-depth review covering performance benchmarks, battery life testing, and real-world usage scenarios. The reviewer examines build quality, display accuracy, keyboard comfort, and thermal management. Comparison with competing models and value proposition analysis included.';
    } else if (lowerTitle.includes('headphone') || lowerTitle.includes('audio')) {
      return 'Comprehensive audio quality test including noise cancellation effectiveness, battery performance, and comfort during extended use. The review covers sound signature analysis, microphone quality for calls, and comparison with other premium headphones in the same price range.';
    }
    
    return 'Professional review covering key features, performance analysis, build quality assessment, and real-world usage testing. The reviewer provides honest pros and cons, comparison with competitors, and recommendations for different user types and budgets.';
  },

  extractKeyPoints(summary) {
    // Extract key points from summary
    const sentences = summary.split('.').filter(s => s.trim().length > 0);
    return sentences.slice(0, 3).map(s => s.trim() + '.');
  },

  async getVideoAnalytics(videoId) {
    try {
      // Simulate video analytics
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        analytics: {
          sentiment: Math.random() > 0.3 ? 'positive' : 'neutral',
          rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
          trustScore: Math.floor(Math.random() * 30 + 70), // 70-100
          keyMentions: [
            'battery life',
            'camera quality',
            'build quality',
            'performance',
            'value for money'
          ].slice(0, Math.floor(Math.random() * 3 + 2))
        }
      };
    } catch (error) {
      console.error('Video analytics error:', error);
      return { success: false };
    }
  }
};

window.youtubeAPI = youtubeAPI;