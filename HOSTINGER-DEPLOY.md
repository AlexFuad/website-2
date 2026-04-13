# Caniel Agency - Hostinger Shared Hosting Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Caniel Agency React application to Hostinger shared hosting.

## Prerequisites

- Node.js and npm installed on your computer
- Hostinger shared hosting account
- Access to Hostinger File Manager or FTP

---

## Method 1: ZIP File Upload (Recommended - Easiest)

### Step 1: Build the Project

Run the deployment script:

```bash
deploy-hostinger.bat
```

This will:
1. Clean any previous builds
2. Build the production bundle (`npm run build`)
3. Copy `.htaccess` to the build folder
4. Create a ZIP file: `caniel-hostinger-deploy.zip`

### Step 2: Upload to Hostinger

1. **Login to Hostinger** at [hpanel.hostinger.com](https://hpanel.hostinger.com)

2. **Go to File Manager:**
   - Click on your domain (caniel.my.id)
   - Click **File Manager**

3. **Navigate to public_html:**
   - Open the `public_html` folder

4. **Clean old files:**
   - Select all existing files
   - Click **Delete** (backup first if needed!)

5. **Upload ZIP:**
   - Click **Upload** button
   - Select `caniel-hostinger-deploy.zip`
   - Wait for upload to complete

6. **Extract ZIP:**
   - Right-click on `caniel-hostinger-deploy.zip`
   - Click **Extract**
   - Extract to: `/public_html/`
   - Click **Extract**

7. **Verify extraction:**
   - You should see these files in `public_html`:
     - `index.html`
     - `.htaccess`
     - `static/` folder
     - `favicon.ico` (if present)
     - Other assets

### Step 3: Test Your Site

1. Visit: `https://caniel.my.id`
2. Test navigation and page refreshes
3. Check that all assets load correctly

---

## Method 2: Direct File Upload (Alternative)

### Step 1: Build the Project

Run the quick build script:

```bash
build-for-hostinger.bat
```

Or manually:

```bash
npm run build
copy .htaccess build\.htaccess
```

### Step 2: Upload Files

1. **Login to Hostinger File Manager**

2. **Navigate to public_html**

3. **Delete old files** (backup first!)

4. **Upload all files** from the `build/` folder:
   - Open the `build/` folder on your computer
   - Select **ALL files and folders**
   - Upload to `public_html/` on Hostinger
   - Make sure `.htaccess` is included

5. **Verify upload:**
   - Check that these exist in `public_html`:
     - ✅ `index.html`
     - ✅ `.htaccess`
     - ✅ `static/` folder
     - ✅ `asset-manifest.json`

---

## Method 3: FTP Upload (For Large Files)

### Step 1: Build the Project

```bash
build-for-hostinger.bat
```

### Step 2: Connect via FTP

1. **Get FTP credentials from Hostinger:**
   - Go to **FTP Accounts** in Hostinger
   - Note your FTP username, password, and host

2. **Use an FTP client** (FileZilla recommended):
   - Host: Your domain or Hostinger FTP server
   - Username: From Hostinger
   - Password: From Hostinger
   - Port: 21

3. **Navigate to `/public_html/`**

4. **Upload all files** from `build/` folder

---

## File Structure on Hostinger

After deployment, your `public_html` should look like this:

```
public_html/
├── .htaccess                 ← Important for routing
├── index.html               ← Main entry point
├── asset-manifest.json      ← React build manifest
├── favicon.ico              ← Site favicon (if exists)
├── manifest.json            ← Web app manifest (if exists)
├── logo192.png              ← App icons (if exist)
├── logo512.png
├── robots.txt               ← SEO robots file
└── static/                  ← Static assets folder
    ├── css/
    ├── js/
    └── media/
```

---

## Important: .htaccess Configuration

The `.htaccess` file is **critical** for React Router to work correctly. It:

- Enables client-side routing
- Prevents 404 errors on page refresh
- Adds security headers
- Enables compression
- Sets cache control

**If `.htaccess` is missing:**
- Pages will show 404 on refresh
- React Router won't work correctly

**To verify `.htaccess`:**
1. Check it exists in `public_html`
2. Make sure it's not hidden (enable "Show hidden files" in File Manager)
3. Verify content matches the file in this repository

---

## Troubleshooting

### Issue: 404 Error on Page Refresh

**Cause:** `.htaccess` is missing or not working

**Solution:**
1. Verify `.htaccess` exists in `public_html`
2. Make sure the file starts with `<IfModule mod_rewrite.c>`
3. Contact Hostinger support to enable `mod_rewrite`
4. Re-upload `.htaccess` from this repository

### Issue: CSS/JS Not Loading

**Cause:** Incorrect file paths or missing `static/` folder

**Solution:**
1. Check that `static/` folder exists in `public_html`
2. Verify `index.html` references correct paths
3. Rebuild the project: `npm run build`
4. Re-upload all files

### Issue: Blank White Page

**Cause:** JavaScript errors or missing files

**Solution:**
1. Open browser console (F12) to check errors
2. Verify all files uploaded correctly
3. Check `index.html` exists in `public_html`
4. Rebuild and re-upload

### Issue: Mixed Content (HTTP/HTTPS)

**Cause:** Resources loading over HTTP instead of HTTPS

**Solution:**
1. Enable HTTPS in Hostinger dashboard
2. Force HTTPS redirect in `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Issue: Site Not Updating After Upload

**Cause:** Browser cache or incomplete upload

**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Verify upload completion in Hostinger
4. Try incognito/private browsing mode

---

## Deployment Workflow

After making code changes:

```bash
# 1. Make your changes
# Edit source files...

# 2. Commit to Git
git add .
git commit -m "Description of changes"
git push origin master

# 3. Build for Hostinger
deploy-hostinger.bat

# 4. Upload to Hostinger
# Use File Manager to upload caniel-hostinger-deploy.zip

# 5. Test at https://caniel.my.id
```

---

## Performance Optimization Tips

### Enable GZIP Compression
Already included in `.htaccess` - no action needed.

### Enable Browser Caching
Already included in `.htaccess` - static assets cached for 1 month.

### Optimize Images
- Compress images before upload
- Use WebP format when possible
- Resize images to actual display size

### Minimize Files
- `npm run build` already minifies CSS/JS
- Remove unused dependencies
- Lazy load components when possible

---

## Security Checklist

- ✅ `.htaccess` includes security headers
- ✅ Directory browsing disabled
- ✅ X-Frame-Options set (prevents clickjacking)
- ✅ X-Content-Type-Options set (prevents MIME sniffing)
- ✅ XSS protection enabled
- ✅ HTTPS enabled (configure in Hostinger)

---

## Quick Commands Reference

```bash
npm start                    # Development server
npm run build                # Production build
deploy-hostinger.bat         # Build + create ZIP for upload
build-for-hostinger.bat      # Build only (no ZIP)
```

---

## Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Verify file structure** matches the expected layout
3. **Check browser console** for JavaScript errors
4. **Contact Hostinger support** with error messages
5. **Rebuild and re-upload** as a last resort

---

## Alternative: Deploy to Vercel/Netlify (Recommended for React)

For better performance and easier deployment, consider:

### Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import your repository
4. Auto-builds and deploys
5. Set custom domain: `caniel.my.id`

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Connect repository
4. Build command: `npm run build`
5. Publish directory: `build`
6. Set custom domain: `caniel.my.id`

---

## Last Updated

April 13, 2026
