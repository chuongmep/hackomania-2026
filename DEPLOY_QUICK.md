# 🚀 Quick Deployment Guide

## Deploy to Vercel (Recommended)

### Method 1: One-Click Deploy
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Vercel will auto-detect settings from `vercel.json`
5. Click "Deploy" ✨

### Method 2: CLI Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
vercel

# Or deploy to production directly
vercel --prod
```

## 🌐 What Gets Deployed

- **Main Domain** (`/`) → PAB Dashboard
- **User Audio** (`/user.html`) → Audio Recorder

## 🧪 Test Build Locally

```bash
# Build both apps
./deploy.sh

# Preview the combined output
cd dist-combined
python3 -m http.server 8000
# Visit http://localhost:8000
```

## 📝 Environment Variables (Optional)

Add in Vercel Dashboard → Settings → Environment Variables:

**For PAB Dashboard:**
- `VITE_API_URL` - Backend API URL
- `VITE_MAP_CENTER_LAT` - Default map latitude
- `VITE_MAP_CENTER_LNG` - Default map longitude

**For User Audio:**
- `REACT_APP_API_URL` - Backend API URL

## 🔧 Troubleshooting

**Build fails?**
- Check Node.js version (use Node 18+)
- Ensure both apps build individually first

**404 errors?**
- Verify `vercel.json` is in the root
- Check the rewrite rules

**Assets not loading?**
- Clear browser cache
- Check console for CORS errors

## 📦 File Structure After Build

```
dist-combined/
├── index.html          # PAB Dashboard entry
├── user.html           # User Audio entry (redirects to /user-audio/)
├── assets/             # PAB Dashboard assets
├── user-audio/         # User Audio app
│   ├── index.html
│   └── static/
└── ...
```

## ✅ Pre-Deployment Checklist

- [ ] Both apps build without errors locally
- [ ] API endpoints configured (if needed)
- [ ] Environment variables set in Vercel
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic on Vercel)

---

**Need help?** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.
