#!/bin/bash
set -e

echo "🏗️  Building both frontend apps..."

# Build pab-dashboard (Vite)
echo "📦 Building pab-dashboard..."
cd front-end/pab-dashboard
npm install
npm run build
cd ../..

# Build user-audio (Create React App)
echo "📦 Building user-audio..."
cd front-end/user-audio
npm install
# Set production API endpoint
export REACT_APP_API_URL=/api/audio
npm run build
cd ../..

# Merge builds - copy user-audio into pab-dashboard dist
echo "🔗 Merging builds..."
DASHBOARD_DIST="front-end/pab-dashboard/dist"
USER_AUDIO_BUILD="front-end/user-audio/build"

# Create static directories if they don't exist
mkdir -p "${DASHBOARD_DIST}/static/js"
mkdir -p "${DASHBOARD_DIST}/static/css"

# Copy user-audio static assets to dashboard dist
# Use -n to not overwrite existing files from pab-dashboard
cp -rn "${USER_AUDIO_BUILD}/static/." "${DASHBOARD_DIST}/static/" 2>/dev/null || true

# Rename and copy user-audio index.html to user.html
cp "${USER_AUDIO_BUILD}/index.html" "${DASHBOARD_DIST}/user.html"

# Copy asset manifest with different name
if [ -f "${USER_AUDIO_BUILD}/asset-manifest.json" ]; then
  cp "${USER_AUDIO_BUILD}/asset-manifest.json" "${DASHBOARD_DIST}/user-asset-manifest.json"
fi

echo "✅ Build complete! Both apps are in ${DASHBOARD_DIST}"
echo "   - Dashboard: index.html (pab-dashboard)"
echo "   - User Audio: user.html"
echo ""
echo "📍 URLs after deployment:"
echo "   - Dashboard: https://your-domain.vercel.app/"
echo "   - User Audio: https://your-domain.vercel.app/user.html"
echo "   - User Audio (alt): https://your-domain.vercel.app/user"

