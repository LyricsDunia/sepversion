# 🐙 GitHub Deployment Guide

## Quick Start Guide

### Method 1: Web Interface Upload
1. Create new repository on GitHub
2. Click "uploading an existing file"
3. Drag all project files
4. Commit changes
5. Enable Pages in Settings

### Method 2: Git Command Line
```bash
git init
git add .
git commit -m "Deploy GadgetFinder app"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Method 3: GitHub Desktop
1. Clone empty repository
2. Copy files to local folder
3. Commit and push changes

## GitHub Pages Setup

1. **Repository Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: main
4. **Folder**: / (root)
5. **Save**

## Verification

Test these after deployment:
- [ ] Page loads without errors
- [ ] All components render
- [ ] Chatbot responds
- [ ] Search functionality works
- [ ] Mobile responsive

## Updates

Push changes to main branch for auto-deployment.

## Custom Domain (Optional)

1. Add CNAME file with domain
2. Configure DNS records
3. Enable in Pages settings

## Troubleshooting

- Ensure `index.html` is in root
- Check browser console for errors
- Verify all file paths are correct