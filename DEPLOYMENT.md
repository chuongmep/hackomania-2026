# Deployment Guide

This project combines two frontend applications into a single deployment:
- **pab-dashboard**: Main dashboard (accessible at root domain)
- **user-audio**: Audio recorder (accessible at `/user.html`)

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Deploy from the project root:
```bash
vercel
```

3. Follow the prompts:
   - Link to existing project or create new
   - Accept the detected settings
   - Deploy!

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the `vercel.json` configuration
5. Click "Deploy"

## 📁 Project Structure

```
/                           → pab-dashboard (main dashboard)
/user.html                  → user-audio entry point
/user-audio/                → user-audio app files
```

## 🛠️ Manual Build

To build the combined distribution locally:

```bash
chmod +x deploy.sh
./deploy.sh
```

This will:
1. Build pab-dashboard (Vite)
2. Build user-audio (Create React App)
3. Combine both into `dist-combined/` directory
4. Create routing structure

The `dist-combined/` directory can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- etc.

## 🌐 Access URLs

After deployment:
- **Main Dashboard**: `https://yourdomain.com`
- **User Audio**: `https://yourdomain.com/user.html`

## 📋 Environment Variables

If your apps need environment variables, add them in Vercel:

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `VITE_API_URL` (for pab-dashboard)
   - `REACT_APP_API_URL` (for user-audio)
   - etc.

## 🔧 Local Development

To develop each app separately:

### pab-dashboard
```bash
cd front-end/pab-dashboard
npm install
npm run dev
```

### user-audio
```bash
cd front-end/user-audio
npm install
npm start
```

## 📝 Notes

- Both apps are built as static sites
- The deployment uses client-side routing
- `vercel.json` handles rewrites for proper SPA routing
- Static assets are cached for performance
- The build script is platform-independent (works on Linux, macOS, Windows with Git Bash)

## 🐛 Troubleshooting

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### 404 errors after deployment
- Check that `vercel.json` rewrites are configured correctly
- Verify the output directory structure

### Assets not loading
- Check the base URL configuration in both apps
- For pab-dashboard: Update `vite.config.js` if using a subdirectory
- For user-audio: Update `homepage` in `package.json` if needed

## 🔄 Continuous Deployment

If using Git integration with Vercel:
- Push to `main` branch → Automatic production deployment
- Push to other branches → Preview deployments

## 📊 Performance Optimization

The configuration includes:
- Immutable caching for static assets (1 year)
- No caching for HTML files (always fresh)
- Optimized build output from both Vite and CRA
