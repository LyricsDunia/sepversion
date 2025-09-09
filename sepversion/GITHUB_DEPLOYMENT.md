# GitHub Deployment Guide - MongoDB Backend Version

This version of GadgetFinder includes a full MongoDB backend with Express.js server.

## Deployment Options

### Option 1: Frontend Only (GitHub Pages)

If you want to deploy just the frontend to GitHub Pages for demonstration:

1. **Use the frontend directory:**
   - All frontend files are in the `frontend/` directory
   - Can be deployed to GitHub Pages as static files
   - Will use mock data for demonstration

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and select `/frontend` as root folder
   - Your site will be available at: `https://YOUR_USERNAME.github.io/gadget-finder/`

### Option 2: Full Stack Deployment (Recommended)

Deploy the complete application with MongoDB backend:

#### Deploy to Railway

1. **Create Railway account** at railway.app
2. **Connect GitHub repository**
3. **Add environment variables:**
   ```
   MONGODB_URI=mongodb://localhost:27017/gadget-finder
   PORT=3000
   NODE_ENV=production
   ```
4. **Deploy automatically**

#### Deploy to Heroku

1. **Create Heroku account** and install Heroku CLI
2. **Create new app:**
   ```bash
   heroku create your-app-name
   ```
3. **Add MongoDB Atlas:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```
4. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

#### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```
2. **Deploy:**
   ```bash
   vercel --prod
   ```
3. **Add environment variables in Vercel dashboard**

### Option 3: MongoDB Atlas Setup

For production deployment, use MongoDB Atlas:

1. **Create MongoDB Atlas account**
2. **Create new cluster**
3. **Get connection string**
4. **Update environment variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gadget-finder
   ```

## Local Development

1. **Install MongoDB locally** or use MongoDB Atlas
2. **Clone and setup:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/gadget-finder.git
   cd gadget-finder
   npm install
   ```
3. **Create .env file:**
   ```
   MONGODB_URI=mongodb://localhost:27017/gadget-finder
   PORT=3000
   NODE_ENV=development
   ```
4. **Start development server:**
   ```bash
   npm run dev
   ```

## File Structure for Deployment

```
gadget-finder/
├── frontend/           # Static files for frontend-only deployment
├── backend/           # Backend logic and models
├── server.js          # Main server file
├── package.json       # Node.js dependencies
├── .env              # Environment variables (not in git)
└── README.md         # Documentation
```

## Environment Configuration

### Development (.env)
```env
MONGODB_URI=mongodb://localhost:27017/gadget-finder
PORT=3000
NODE_ENV=development
```

### Production (Platform Variables)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gadget-finder
PORT=80
NODE_ENV=production
```

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Errors:**
   - Check connection string format
   - Verify network access in MongoDB Atlas
   - Ensure IP whitelist includes your deployment platform

2. **Frontend API Calls Failing:**
   - Verify backend URL is correct
   - Check CORS configuration
   - Ensure all API endpoints are working

3. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are listed in package.json
   - Review deployment logs for specific errors

### Success Checklist:

- ✅ MongoDB connection established
- ✅ Sample data loaded automatically
- ✅ Frontend can fetch data from backend
- ✅ All components render correctly
- ✅ Chatbot and search functionality works
- ✅ Environment variables configured properly

The application will automatically initialize with sample product data when first deployed!