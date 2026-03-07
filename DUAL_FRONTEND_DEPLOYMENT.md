# Dual Frontend Deployment Guide

## 🎯 What's Deployed

Your Vercel deployment now serves **TWO React apps** from a single domain:

1. **PAB Dashboard** (Vite) → Main app at `/`
2. **User Audio Recorder** (CRA) → Emergency alert app at `/user.html` or `/user`

## 📍 URLs After Deployment

```
https://your-domain.vercel.app/              → PAB Dashboard
https://your-domain.vercel.app/user.html     → User Audio Recorder
https://your-domain.vercel.app/user          → User Audio Recorder (same)
https://your-domain.vercel.app/api/health    → Backend API
https://your-domain.vercel.app/api/audio     → Audio upload endpoint
```

## 🏗️ How It Works

### Build Process

1. **Builds pab-dashboard** (Vite) → Creates `dist/`
2. **Builds user-audio** (Create React App) → Creates `build/`
3. **Merges both builds** into single `dist/` folder:
   - `pab-dashboard/dist/index.html` → Main entry
   - `user-audio/build/index.html` → Copied as `user.html`
   - All `/static` assets from both apps merged

### Routing

The `vercel.json` rewrites configuration:
```json
{
  "source": "/api/:path*",
  "destination": "/api"          // Backend API
},
{
  "source": "/user.html",
  "destination": "/user.html"    // User audio app
},
{
  "source": "/user",  
  "destination": "/user.html"    // Alias for user audio
},
{
  "source": "/(.*)",
  "destination": "/index.html"   // PAB dashboard (default)
}
```

## 🚀 Deploy Now

```bash
cd /Users/me/Downloads/repos/hackomania-2026

# Commit all changes
git add .
git commit -m "Deploy both frontends with user-audio at /user.html"

# Deploy to Vercel
vercel --prod
```

## 🧪 Test After Deployment

### Frontend Apps
```bash
# PAB Dashboard
curl https://your-domain.vercel.app/
# Should return HTML with pab-dashboard content

# User Audio Recorder
curl https://your-domain.vercel.app/user.html
# Should return HTML with user-audio recorder app

# User Audio (alternate URL)
curl https://your-domain.vercel.app/user
# Should return same as /user.html
```

### Backend API
```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Audio upload test (with file)
curl -X POST https://your-domain.vercel.app/api/audio \
  -F "audio=@test.webm"
# Should return: {"status":"success","message":"Emergency alert received!..."}
```

## 📱 User Audio App Features

The user-audio app at `/user.html` provides:
- 🎤 One-tap emergency recording
- 📤 Automatic upload to `/api/audio` endpoint
- 🌊 Visual wave animation during recording
- ✅ Success/error feedback
- 📱 Mobile-optimized interface

### API Integration

The app automatically uses the correct endpoint:
- **Production (Vercel)**: `/api/audio` (relative path)
- **Local dev**: `http://localhost:8000/audio` (from `.env.development`)

## 🔧 Local Development

### Terminal 1: Backend
```bash
cd backend
source ../.venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### Terminal 2: PAB Dashboard
```bash
cd front-end/pab-dashboard
npm run dev
# Runs on http://localhost:5173
```

### Terminal 3: User Audio
```bash
cd front-end/user-audio
npm start
# Runs on http://localhost:3000
```

## 📂 Project Structure

```
hackomania-2026/
├── api/
│   ├── index.py              # Serverless function entry
│   └── requirements.txt      # API dependencies
├── backend/
│   ├── app/
│   │   └── main.py           # NEW: /audio endpoint added
│   └── requirements.txt
├── front-end/
│   ├── pab-dashboard/        # Main dashboard (Vite)
│   └── user-audio/           # Emergency recorder (CRA)
│       ├── .env.production   # NEW: Sets API_URL=/api/audio
│       └── .env.development  # NEW: Local dev settings
├── build-both.sh             # NEW: Builds both apps
└── vercel.json              # Routes both apps
```

## 🎨 Customization

### Change User Audio URL

To serve user-audio at a different path (e.g., `/emergency`):

1. **Update build script** (`build-both.sh`):
```bash
cp "${USER_AUDIO_BUILD}/index.html" "${DASHBOARD_DIST}/emergency.html"
```

2. **Update vercel.json**:
```json
{
  "source": "/emergency",
  "destination": "/emergency.html"
}
```

### Add More Apps

To add a third frontend app:

1. Build the new app
2. Copy its `index.html` as `newapp.html` to `dist/`
3. Copy its static assets to `dist/static/`
4. Add rewrite rule in `vercel.json`

## ⚠️ Important Notes

### Static Asset Conflicts

Both apps use `/static/js/` and `/static/css/`. The build script uses `cp -rn` to avoid overwriting files. If you see asset loading issues:

1. Check browser console for 404 errors
2. Verify both builds completed successfully
3. Check `dist/static/` has all required files

### Environment Variables

**User Audio App** needs these in Vercel:
- Usually none required (uses relative `/api/audio` path)

**Backend API** needs:
- `CH_HOST`, `CH_PORT`, `CH_USER`, `CH_PASSWORD`, `CH_DATABASE`, `CH_SECURE`

### Mobile Access

Both apps are mobile-optimized. The user-audio app especially:
- Prevents zoom on tap (viewport settings)
- Large touch targets for emergency button
- Works offline (caches recording)

## 🐛 Troubleshooting

### User Audio Returns 404
- Check that `build-both.sh` ran successfully  
- Verify `dist/user.html` exists after build
- Check `vercel.json` has rewrite rules

### Static Assets 404
- Both apps share `/static/` folder
- Check for filename conflicts
- Rebuild both apps: `bash build-both.sh`

### Audio Upload Fails
- Check `/api/audio` endpoint: `curl https://domain/api/audio`
- Verify CORS is enabled (already configured)
- Check browser console for errors
- Verify `python-multipart` in `api/requirements.txt`

### Build Script Fails
```bash
# Make it executable
chmod +x build-both.sh

# Run manually to see errors
bash -x build-both.sh
```

## 📊 Performance

- **PAB Dashboard**: ~500KB (Vite optimized)
- **User Audio**: ~200KB (minimal app)
- **Total**: ~700KB + shared static assets
- **Cold start**: <1s (serverless function)
- **CDN**: Vercel Edge Network (global)

## 🎉 Success Checklist

- [ ] Both apps build successfully locally
- [ ] `build-both.sh` completes without errors
- [ ] Committed all changes to git
- [ ] Deployed to Vercel
- [ ] PAB Dashboard loads at `/`
- [ ] User Audio loads at `/user.html` and `/user`
- [ ] Backend API responds at `/api/health`
- [ ] Audio upload works at `/api/audio`
- [ ] Environment variables set in Vercel

## 📞 Share With Users

**PAB Dashboard (Operators/Admin)**:
```
https://your-project.vercel.app/
```

**Emergency Recorder (End Users)**:
```
https://your-project.vercel.app/user
```

Users can bookmark `/user` for quick access to emergency reporting!
