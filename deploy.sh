#!/bin/bash

# Build script for unified deployment
# Builds both pab-dashboard and user-audio and merges them

set -e

echo "🚀 Starting unified build process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist-combined
mkdir -p dist-combined

# Build pab-dashboard (Vite app)
echo "📦 Building pab-dashboard..."
cd front-end/pab-dashboard
npm install
npm run build
cd ../..

# Build user-audio (Create React App)
echo "📦 Building user-audio..."
cd front-end/user-audio
npm install
npm run build
cd ../..

# Copy pab-dashboard to root of dist-combined
echo "📂 Copying pab-dashboard to deployment directory..."
cp -r front-end/pab-dashboard/dist/* dist-combined/

# Create user directory and copy user-audio build
echo "📂 Setting up user-audio at /user.html..."
mkdir -p dist-combined/user-audio

# Copy user-audio build files
cp -r front-end/user-audio/build/* dist-combined/user-audio/

# Create user.html that redirects/loads the user-audio app
cat > dist-combined/user.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Audio Recorder</title>
    <script>
        // Redirect to the user-audio app
        window.location.href = '/user-audio/index.html';
    </script>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .loader {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="loader">
        <h2>Loading User Audio Recorder...</h2>
        <p>If not redirected, <a href="/user-audio/index.html" style="color: white;">click here</a></p>
    </div>
</body>
</html>
EOF

echo "✅ Build complete! Output in dist-combined/"
echo "📊 Structure:"
echo "   - Main dashboard: dist-combined/index.html"
echo "   - User audio: dist-combined/user.html → /user-audio/index.html"
