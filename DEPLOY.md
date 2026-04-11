# Caniel Agency - Hostinger Deployment Guide

## Problem: "Framework tidak kompatibel atau struktur project tidak valid"

This error occurs because Hostinger's auto-deploy from GitHub expects PHP/WordPress projects and **cannot build React/Node.js projects** automatically.

## Root Cause

Your repository (`https://github.com/AlexFuad/website-2.git`) contains React source code that requires a build process (`npm run build`). Hostinger's shared hosting cannot execute this build step.

## Solution: Proper GitHub Auto-Deploy Setup

### Step 1: Prepare Your Repository

1. **Ensure you're on the latest master branch:**
   ```bash
   git checkout master
   git pull origin master
   ```

2. **Run the deployment script:**
   ```bash
   deploy-hostinger.bat
   ```
   
   This script will:
   - Build the production bundle
   - Create/update the `hostinger` branch with built files
   - Push to GitHub automatically

### Step 2: Configure Hostinger Auto-Deploy

1. **Log in to Hostinger** and go to **Websites** → Select your domain (caniel.my.id)

2. **Access Git Deployment:**
   - Navigate to **Website** → **Git Integration** (or **Deployment** section)
   - Click **Connect Repository**

3. **Connect GitHub Repository:**
   - Repository URL: `https://github.com/AlexFuad/website-2.git`
   - **IMPORTANT:** Select branch: **`hostinger`** (NOT `master`)
   - Deployment path: `/build/` (if Hostinger asks for subdirectory)
   
4. **Configure Auto-Deploy Settings:**
   - Enable **Auto-deploy** (if available)
   - Set branch to `hostinger`
   - Leave other settings as default

5. **Deploy:**
   - Click **Deploy** or **Deploy Now**
   - Wait for deployment to complete (should take 1-2 minutes)

### Step 3: Verify Deployment

After deployment completes:

1. **Visit your domain:** `https://caniel.my.id`
2. **Check these pages:**
   - Home page loads correctly
   - Navigation works
   - All assets (CSS, JS, images) load properly
   - Client-side routing works (try refreshing on different pages)

3. **If you see 404 errors on page refresh:**
   - Verify `.htaccess` file is present in the `build/` folder
   - Contact Hostinger support to ensure `mod_rewrite` is enabled

## Alternative: Manual Upload (If Git Deploy Fails)

If the Git auto-deploy continues to have issues:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Upload via Hostinger File Manager:**
   - Go to **Hostinger** → **File Manager**
   - Navigate to `public_html/`
   - **Delete** existing files (backup first if needed)
   - **Upload ALL files** from the `build/` folder to `public_html/`
   - Ensure `.htaccess` is uploaded

## Alternative: Use Vercel/Netlify (Recommended for React Apps)

For better performance and easier deployment:

### Deploy to Vercel:
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** → Import your repository
3. Vercel will auto-detect React and build automatically
4. Set custom domain: `caniel.my.id`
5. Update DNS records at your domain registrar to point to Vercel

### Deploy to Netlify:
1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **Add new site** → **Import an existing project**
3. Connect repository and set:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Set custom domain: `caniel.my.id`
5. Update DNS records

## Important Notes

- **NEVER commit `node_modules/`** to your repository (already in `.gitignore`)
- **Always rebuild after code changes:** `npm run build`
- **The `hostinger` branch** contains only the built files, not source code
- **The `master` branch** contains your source code
- **`.htaccess`** handles client-side routing for React Router

## Deployment Workflow (After Each Code Change)

```bash
# 1. Make your code changes
# Edit your source files...

# 2. Commit source code changes
git add .
git commit -m "Description of changes"
git push origin master

# 3. Build and deploy to Hostinger
deploy-hostinger.bat

# 4. Verify at https://caniel.my.id
```

## Troubleshooting

### "Framework tidak kompatibel" Error
- ✅ You're deploying from the **`hostinger` branch** (not `master`)
- ✅ The deployment path is set to `/build/` (if required)
- ✅ The `build/` folder contains all necessary files

### 404 Errors on Page Refresh
- ✅ `.htaccess` file exists in the deployment directory
- ✅ `mod_rewrite` is enabled on Hostinger (contact support)
- ✅ `.htaccess` content matches the file in your repository

### CSS/JS Not Loading
- ✅ Rebuild the project: `npm run build`
- ✅ Check that `build/` folder has `static/` subfolder
- ✅ Verify file paths in `build/index.html` are correct

### Git Deploy Not Working
- ✅ Check that Hostinger has access to your GitHub repository
- ✅ Verify the `hostinger` branch exists and has been pushed
- ✅ Try disconnecting and reconnecting the repository in Hostinger

### Mixed Content (HTTP/HTTPS) Issues
- ✅ Update your site URL in Hostinger settings to `https://caniel.my.id`
- ✅ Ensure all asset URLs use HTTPS
- ✅ Enable HTTPS/SSL in Hostinger dashboard

## Quick Commands Reference

```bash
npm run build          # Build for production
npm run dev            # Start dev server
deploy-hostinger.bat   # Build + deploy to Hostinger branch
```

## Support

If issues persist:
1. Contact Hostinger support with the error message
2. Consider using Vercel/Netlify (better suited for React apps)
3. Check Hostinger's documentation on Git deployment
