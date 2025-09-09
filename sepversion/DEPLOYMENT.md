# Deployment Guide for GadgetFinder

## Step-by-Step GitHub Deployment

### 1. Prepare Your Repository

1. **Create a new repository on GitHub:**
   - Go to https://github.com
   - Click "New repository"
   - Name it `gadget-finder` (or your preferred name)
   - Make it public for GitHub Pages
   - Don't initialize with README (we have our own)

### 2. Upload Your Code

**Option A: Using Git Command Line**

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: GadgetFinder application"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/gadget-finder.git

# Push to GitHub
git push -u origin main
```

**Option B: Using GitHub Desktop**

1. Download GitHub Desktop
2. Clone your empty repository
3. Copy all project files to the cloned folder
4. Commit and push changes

**Option C: Upload via GitHub Web Interface**

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all your project files
4. Commit changes

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at: `https://YOUR_USERNAME.github.io/gadget-finder/`

### 4. Verify Deployment

1. Wait 5-10 minutes for deployment
2. Visit your GitHub Pages URL
3. Test all features:
   - AI search functionality
   - Chatbot responses
   - Price comparisons
   - Feature comparisons
   - Voice search simulation

## Alternative Deployment Options

### Netlify (Recommended for better performance)

1. **Sign up at netlify.com**
2. **Connect GitHub:**
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
3. **Deploy settings:**
   - Build command: (leave empty)
   - Publish directory: (leave empty or use `/`)
   - Click "Deploy site"
4. **Custom domain (optional):**
   - Go to Site settings > Domain management
   - Add custom domain

### Vercel

1. **Sign up at vercel.com**
2. **Import project:**
   - Click "Import Git Repository"
   - Select your GitHub repository
3. **Deploy:**
   - Framework preset: Other
   - No build configuration needed
   - Click "Deploy"

## Troubleshooting

### Common Issues:

1. **404 Error on GitHub Pages:**
   - Ensure `index.html` is in the root directory
   - Check that Pages is enabled in repository settings

2. **JavaScript not working:**
   - Check browser console for errors
   - Ensure all CDN links are accessible

3. **Chatbot not responding:**
   - Verify AI agent integration is working
   - Check browser console for API errors

4. **Images not loading:**
   - Ensure image URLs are accessible
   - Check network connectivity

### Performance Optimization:

1. **Enable HTTPS** (automatic on GitHub Pages/Netlify/Vercel)
2. **Use CDN** for external resources (already implemented)
3. **Optimize images** if adding custom images

## Monitoring

After deployment, monitor:
- Site availability
- JavaScript console errors
- User feedback through chatbot
- Performance metrics

## Updates

To update your deployed site:
1. Make changes to your local code
2. Commit and push to GitHub
3. GitHub Pages/Netlify/Vercel will auto-deploy

Your site should work exactly the same as your local version!