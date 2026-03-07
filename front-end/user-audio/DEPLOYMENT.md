# Vercel Deployment Guide

## Important: Subfolder Deployment

This app is located in `front-end/user-audio/` subfolder. You need to configure Vercel to use this as the root directory.

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your Git repository
5. **IMPORTANT:** Configure the root directory:
   - Click "Edit" next to "Root Directory"
   - Enter: `front-end/user-audio`
   - Click "Continue"
6. Vercel will auto-detect it's a Create React App
7. Verify build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
8. Add environment variable (see below)
9. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Navigate to the user-audio directory:
```bash
cd front-end/user-audio
```

4. Deploy from this directory:
```bash
vercel
```

5. For production deployment:
```bash
vercel --prod
```

## Environment Variables

Set your backend API URL in Vercel:

1. Go to your project settings in Vercel Dashboard
2. Navigate to "Environment Variables"
3. Add the following:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend API URL (e.g., `https://api.yourdomain.com/api/audio`)
   - **Environment:** Select Production, Preview, and Development

Or use Vercel CLI:
```bash
vercel env add REACT_APP_API_URL
```

## Custom Domain

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## Build Configuration

The `vercel.json` file is already configured with:
- Static build output from `build/` directory
- SPA routing (all routes redirect to index.html)
- Environment variable support

## Automatic Deployments

Once connected to GitHub with the root directory configured as `front-end/user-audio`:
- Every push to `main` branch deploys to production
- Pull requests get preview deployments
- Commits to other branches get preview deployments

**Note:** Make sure the root directory is set to `front-end/user-audio` in your Vercel project settings for automatic deployments to work correctly.

## Deployment Commands Summary

```bash
# Navigate to the app directory
cd front-end/user-audio

# Install dependencies (first time)
npm install

# Test build locally
npm run build

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Open deployment in browser
vercel open
```

## Alternative: Deploy from Repository Root

If you prefer to deploy from the repository root, create a `vercel.json` at the root level:

```json
{
  "buildCommand": "cd front-end/user-audio && npm run build",
  "outputDirectory": "front-end/user-audio/build",
  "installCommand": "cd front-end/user-audio && npm install",
  "devCommand": "cd front-end/user-audio && npm start"
}
```

Then deploy from the repository root directory.

## Troubleshooting

### Build fails with "package.json not found"
- **Solution:** Ensure root directory is set to `front-end/user-audio` in Vercel project settings
- Go to Project Settings → General → Root Directory

### Build fails
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check build logs in Vercel Dashboard
- Verify you're in the correct directory (`front-end/user-audio`)

### Environment variables not working
- Verify variable name starts with `REACT_APP_`
- Redeploy after adding environment variables
- Check variable is set for correct environment

### 404 errors on routes
- `vercel.json` handles SPA routing with rewrites
- Ensure the file is in `front-end/user-audio/` directory
- Check that rewrites configuration is correct

### Root directory issues
- Make sure to set root directory to `front-end/user-audio` when deploying from monorepo
- Or deploy from the subfolder directory using Vercel CLI

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
