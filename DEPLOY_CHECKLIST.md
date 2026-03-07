# ✅ Ready to Deploy - Quick Checklist

## What's Been Set Up

✅ **Build Script** - Builds both React apps and merges them
✅ **User Audio** - Will be at `/user.html` and `/user`
✅ **PAB Dashboard** - Will be at `/` (root)
✅ **Backend API** - Audio upload endpoint at `/api/audio`
✅ **Environment Files** - Production API paths configured
✅ **Vercel Config** - Routing for both apps configured
✅ **Local Test** - Build script tested and working!

## Files Created/Modified

### New Files:
- [build-both.sh](build-both.sh) - Builds and merges both frontends
- [api/index.py](api/index.py) - Serverless function entry
- [api/requirements.txt](api/requirements.txt) - API dependencies + python-multipart
- [front-end/user-audio/.env.production](front-end/user-audio/.env.production) - Production API endpoint
- [front-end/user-audio/.env.development](front-end/user-audio/.env.development) - Local dev settings
- [DUAL_FRONTEND_DEPLOYMENT.md](DUAL_FRONTEND_DEPLOYMENT.md) - Comprehensive guide

### Modified Files:
- [vercel.json](vercel.json) - Routing for both apps
- [backend/app/main.py](backend/app/main.py) - New `/audio` endpoint
- [backend/requirements.txt](backend/requirements.txt) - Added python-multipart

## Deploy Now! 🚀

```bash
# 1. Commit all changes
git add .
git commit -m "Deploy dual frontend: pab-dashboard + user-audio"

# 2. Push to GitHub
git push

# 3. Deploy to Vercel
vercel --prod
```

## After Deployment - Access URLs

Replace `your-project` with your actual Vercel project name:

### For Operators/Admin:
```
https://your-project.vercel.app/
```
→ PAB Dashboard (the main analytics/monitoring interface)

### For End Users (Emergency Reporting):
```
https://your-project.vercel.app/user
```
or
```
https://your-project.vercel.app/user.html
```
→ Audio Recorder (simple one-tap emergency alert)

### API Endpoints:
```
https://your-project.vercel.app/api/health        → Health check
https://your-project.vercel.app/api/audio         → Audio upload (POST)
https://your-project.vercel.app/api/voice-info    → Voice data (GET)
```

## Test After Deploy

### 1. Test PAB Dashboard
Open in browser: `https://your-project.vercel.app/`
- Should show the dashboard interface
- Check browser console for any errors

### 2. Test User Audio App
Open in browser: `https://your-project.vercel.app/user`
- Should show the audio recorder interface
- Try clicking the emergency button
- Grant microphone permissions
- Record a test message
- Should see "HELP NOTIFIED!" message

### 3. Test API
```bash
# Health check
curl https://your-project.vercel.app/api/health

# Should return: {"status":"ok"}
```

## Environment Variables (Double Check!)

In **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**:

Required for database features:
- `CH_HOST` - Your ClickHouse host
- `CH_PORT` - Usually 8443
- `CH_USER` - Database user
- `CH_PASSWORD` - Database password
- `CH_DATABASE` - Database name
- `CH_SECURE` - Set to `true`

After adding/changing variables, redeploy:
```bash
vercel --prod --force
```

## Share With Users

**Operators/Staff** → `https://your-project.vercel.app/`

**End Users/Seniors** → `https://your-project.vercel.app/user`

💡 **Tip**: The `/user` URL is shorter and easier to remember. Users can:
- Bookmark it on their phone home screen
- Save it as a contact/shortcut
- Access it quickly in emergencies

## Troubleshooting

### User audio app shows 404
- Wait 2-3 minutes after deployment
- Check Vercel build logs
- Verify `build-both.sh` ran successfully

### Audio upload fails
- Check `/api/audio` endpoint directly
- Verify `python-multipart` is in requirements
- Check browser console for CORS errors

### Build fails on Vercel
```bash
# Test locally first
bash build-both.sh

# Check for errors in:
- front-end/pab-dashboard build
- front-end/user-audio build
- File merging step
```

### Need help?
See [DUAL_FRONTEND_DEPLOYMENT.md](DUAL_FRONTEND_DEPLOYMENT.md) for detailed troubleshooting.

## What Happens During Build (on Vercel)

1. ⚙️ Runs `bash build-both.sh`
2. 📦 Builds pab-dashboard (Vite) → `dist/index.html`
3. 📦 Builds user-audio (CRA) → `build/index.html`
4. 🔗 Copies `build/index.html` to `dist/user.html`
5. 🔗 Merges all `/static` assets into one folder
6. ✅ Output directory: `front-end/pab-dashboard/dist`
7. 🌐 Deploys to Vercel CDN

## Success!

Once deployed, you'll have:
- ✅ Professional dashboard at root URL
- ✅ Simple emergency interface at `/user`
- ✅ Both apps sharing one backend API
- ✅ Single deployment, single domain
- ✅ No subdomain or CORS issues

Ready? Deploy now! 🚀
