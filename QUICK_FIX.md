# Quick Fix - Vercel 500 Error Resolution

## What Was Fixed

1. ✅ **Created `/api/index.py`** - Proper Vercel serverless function entry point
2. ✅ **Created `/api/requirements.txt`** - Minimal dependencies for faster cold starts  
3. ✅ **Updated `vercel.json`** - Simplified routing with rewrites
4. ✅ **Added error handling** - Database endpoints now return error details
5. ✅ **Created `.vercelignore`** - Exclude unnecessary files

## Deploy the Fix Now

```bash
# From project root
cd /Users/me/Downloads/repos/hackomania-2026

# Stage all changes
git add .

# Commit the fix
git commit -m "Fix Vercel serverless function configuration"

# Deploy to production
vercel --prod
```

## After Deployment - Test These Endpoints

### 1. Basic Health Check (No DB required)
```bash
curl https://your-project.vercel.app/api/
# Expected: {"message":"Welcome to HackIT API"}

curl https://your-project.vercel.app/api/health
# Expected: {"status":"ok"}
```

### 2. Database Connection Test
```bash
curl https://your-project.vercel.app/api/db/ping
# If successful: {"status":"ok","version":"..."}
# If failed: {"status":"error","message":"...","type":"..."}
```

The error message will tell you exactly what's wrong!

### 3. Voice Info Endpoint
```bash
curl https://your-project.vercel.app/api/voice-info?limit=5
# Expected: Array of voice data or error object
```

## If Still Getting 500 Error

### Check Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required:**
- ✅ `CH_HOST`
- ✅ `CH_PORT`  
- ✅ `CH_USER`
- ✅ `CH_PASSWORD`
- ✅ `CH_DATABASE`
- ✅ `CH_SECURE`

After adding variables, **redeploy**:
```bash
vercel --prod --force
```

### View Live Logs

```bash
# Watch logs in real-time
vercel logs --follow

# This will show you the exact error when the function crashes
```

### Common Error Messages & Solutions

| Error Message | Solution |
|--------------|----------|
| `ModuleNotFoundError: No module named 'fastapi'` | Check `api/requirements.txt` exists |
| `ModuleNotFoundError: No module named 'app'` | Path issue - verify `api/index.py` |
| `Connection refused` | Database not accessible from Vercel |
| `Authentication failed` | Wrong `CH_USER` or `CH_PASSWORD` |
| `Unknown database` | Wrong `CH_DATABASE` name |

## Verify File Structure

Make sure these files exist:

```
hackomania-2026/
├── api/
│   ├── index.py          ✅ Must exist
│   └── requirements.txt  ✅ Must exist
├── backend/
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── config.py
│       └── db.py
├── vercel.json           ✅ Updated
└── .vercelignore         ✅ New file
```

Check:
```bash
ls -la api/
# Should show: index.py and requirements.txt
```

## Success Checklist

- [ ] Committed all changes
- [ ] Deployed with `vercel --prod`
- [ ] `/api/` returns welcome message
- [ ] `/api/health` returns status ok
- [ ] Environment variables set in Vercel Dashboard
- [ ] Database endpoints work OR return helpful error messages

## Still Not Working?

Share the output of:
```bash
# Check what was deployed
vercel ls

# View function logs
vercel logs <deployment-url>
```

The logs will show the exact Python error that's causing the crash.
