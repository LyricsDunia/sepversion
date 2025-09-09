# GadgetFinder - AI-Powered Electronic Gadget Recommendations

A modern web application that helps users find the perfect electronic gadgets using AI-powered recommendations, smart filtering, and real-time price comparisons with MongoDB backend.

## Features

- 🤖 AI-powered product recommendations
- 🔍 Smart search with voice input
- 💰 Real-time price comparison across retailers
- 📊 Feature comparison tools
- 🎥 YouTube review integration
- 💬 AI chatbot assistant (GadgetGenie)
- 📱 Responsive design
- 🗄️ MongoDB database integration

## Tech Stack

- **Frontend:** React 18, TailwindCSS, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Icons:** Lucide Icons
- **Hosting:** Can be deployed on any platform

## Project Structure

```
gadget-finder/
├── frontend/                # Frontend React application
│   ├── index.html          # Main HTML file
│   ├── app.js              # Main React app
│   ├── js/
│   │   └── api.js          # API utility functions
│   ├── components/         # React components
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── AISearch.js
│   │   ├── Chatbot.js
│   │   └── ...
│   └── utils/              # Frontend utilities
├── backend/                # Backend structure
│   ├── config/
│   │   └── database.js     # MongoDB configuration
│   ├── models/
│   │   └── Product.js      # Product data model
│   └── routes/
│       └── products.js     # API routes
├── server.js               # Express server
├── package.json            # Dependencies
└── .env                    # Environment variables
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/gadget-finder.git
cd gadget-finder
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `.env` file with your MongoDB connection string

4. **Configure environment:**
```bash
# Copy and update .env file
MONGODB_URI=mongodb://localhost:27017/gadget-finder
PORT=3000
NODE_ENV=development
```

5. **Start the application:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. **Access the application:**
   - Open your browser and go to `http://localhost:3000`

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

1. **Set up MongoDB Atlas (recommended for production)**
2. **Update environment variables**
3. **Deploy to your preferred platform:**
   - Heroku
   - Vercel
   - Netlify
   - Railway
   - DigitalOcean

### Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=production
```

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `GET /api/products?search=query` - Search products

## Features in Detail

### AI-Powered Search
- Natural language product search
- Smart filtering and categorization
- Voice search capability

### Price Comparison
- Real-time price tracking
- Multiple retailer comparison
- Price history charts

### Interactive Chatbot
- GadgetGenie AI assistant
- Product recommendations
- Natural conversation interface

### Database Integration
- MongoDB for product storage
- Efficient querying and filtering
- Scalable data structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue or contact support.