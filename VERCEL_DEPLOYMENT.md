# Vercel Deployment Guide - Full Stack (Backend + Frontend)

This guide explains how to deploy the FastAPI backend and React frontend together on Vercel.

## Project Structure Overview

```
hackomania-2026/
├── api/                      # Vercel serverless functions
│   ├── index.py             # FastAPI entry point
│   └── requirements.txt     # Python dependencies for serverless
├── backend/                  # FastAPI Python backend source
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── config.py        # Settings
│   │   └── db.py            # Database
│   └── requirements.txt     # Full Python dependencies
├── front-end/
│   └── pab-dashboard/       # React (Vite) frontend
├── vercel.json              # Main Vercel configuration
└── .vercelignore            # Files to exclude from deployment
```

## What Was Updated

### ✅ Files Created/Modified:

1. **`/vercel.json`** - Simplified configuration with rewrites
2. **`/api/index.py`** - Serverless function entry point (Vercel convention)
3. **`/api/requirements.txt`** - Minimal dependencies for serverless function
4. **`/.vercelignore`** - Exclude unnecessary files from deployment
5. **`/backend/app/main.py`** - Added CORS middleware + error handling

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"** and import your repository

4. **Configure the project:**
   - **Framework Preset:** Other
   - **Root Directory:** Leave as `.` (root)
   - **Build Command:** Leave empty (handled by vercel.json)
   - **Output Directory:** Leave empty
   
5. **Add Environment Variables** (see below)

6. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from the root directory**
   ```bash
   cd /Users/me/Downloads/repos/hackomania-2026
   vercel
   ```

4. **For production**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Required Variables in Vercel Dashboard:

Go to **Project Settings → Environment Variables** and add:

#### Critical Backend Variables:
```
CH_HOST=your-clickhouse-host.com
CH_PORT=8443
CH_USER=default
CH_PASSWORD=your-secure-password
CH_DATABASE=default
CH_SECURE=true
```

> **⚠️ IMPORTANT**: Without these environment variables, the `/api/db/ping` and `/api/voice-info` endpoints will fail. The `/api/` and `/api/health` endpoints will still work.

#### Optional Application Variables:
```
APP_NAME=Hackomania API
APP_VERSION=0.1.0
APP_DEBUG=false
```

#### Frontend Variables (if needed):
```
VITE_API_URL=https://your-project.vercel.app/api
```

### Using Environment Variables in React (Vite):

In your React components, access them with:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## How It Works

### Routing Configuration:

The `vercel.json` routes requests:
- **`/api/*`** → Backend (Python FastAPI serverless functions)
- **All other routes** → Frontend (React SPA)

### Example API Calls from Frontend:

```javascript
// From your React app, call the backend at /api endpoint
fetch('/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Or with full URL
fetch('https://your-project.vercel.app/api/voice-info')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Testing the Deployment

After deployment, test these endpoints:

1. **Frontend:** `https://your-project.vercel.app/`
2. **Backend Health:** `https://your-project.vercel.app/api/health`
3. **Backend Root:** `https://your-project.vercel.app/api/`
4. **Database Ping:** `https://your-project.vercel.app/api/db/ping`
5. **Voice Info:** `https://your-project.vercel.app/api/voice-info`

## Important Notes

### CORS Configuration

The backend is configured with permissive CORS (`allow_origins=["*"]`). For production, update it:

```python
# In backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-project.vercel.app"],  # Your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Database Configuration

- Make sure your ClickHouse database is accessible from Vercel
- ClickHouse must allow connections from Vercel's IP ranges
- Consider using ClickHouse Cloud or a hosted solution

### Python Dependencies

Vercel automatically installs packages from `backend/requirements.txt`

### Monorepo Structure

The current setup deploys:
- **Backend:** FastAPI serverless functions
- **500 FUNCTION_INVOCATION_FAILED Error

This error means the serverless function crashed. Common causes:

**1. Missing Python Dependencies**
- Check that `api/requirements.txt` includes all necessary packages
- Verify package versions are compatible with Python 3.9 (Vercel default)
- Run locally first: `pip install -r api/requirements.txt`

**2. Module Import Errors**
- The `api/index.py` adds `backend/` to Python path
- Ensure the import structure is correct: `from app.main import app`
- Test imports locally in Python shell

**3. Environment Variables Not Set**
- Go to Vercel Dashboard → Settings → Environment Variables
- Verify all required variables are set (especially `CH_HOST`, `CH_USER`, `CH_PASSWORD`)
- Redeploy after adding environment variables

**4. Database Connection Failure**
- ClickHouse must be accessible from Vercel's network
- Check firewall rules allow external connections
- Test with `/api/db/ping` endpoint to see error details
- The endpoint now returns error messages to help debug

**5. Check Vercel Function Logs**
```bash
# View real-time logs
vercel logs --follow

# View logs for specific deployment
vercel logs <deployment-url>
```

### Frontend:** pab-dashboard (Vite React app)

If you want to deploy `user-audio` instead, update the `vercel.json` builds section.

## Troubleshooting

### Backend Returns 404
- Check that API calls include `/api/` prefix
- Verify `vercel.json` routes configuration

### CORS Errors
- Ensure `CORSMiddleware` is properly configured
- Check that frontend URL is in `allow_origins`

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure Python version compatibility (Vercel uses Python 3.9 by default)

### Database Connection Issues
- Verify ClickHouse credentials in environment variables
- Check firewall rules allow Vercel IP ranges
- Test connection from local environment first

## Alternative: Separate Deployments

If you prefer to deploy backend and frontend separately:

### Backend Only:
1. Deploy from `backend/` folder with custom `vercel.json`
2. Note the backend URL

### Frontend Only:
1. Deploy from `front-end/pab-dashboard/` folder
2. Set `VITE_API_URL` environment variable to backend URL

## Deployment Commands Cheatsheet

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs <deployment-url>

# List deployments
vercel list

# Remove environment variable
vercel env rm <ENV_VAR_NAME>

# Add environment variable
vercel env add <ENV_VAR_NAME>
```

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test all API endpoints
3. ✅ Configure custom domain (optional)
4. ✅ Set up production environment variables
5. ✅ Update CORS for production domain
6. ✅ Monitor deployment logs

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/runtimes#official-runtimes/python)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
