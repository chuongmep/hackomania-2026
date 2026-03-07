# Local Development Setup

This guide shows how to run both backend and frontend locally together.

## Prerequisites

- Python 3.9+
- Node.js 18+
- ClickHouse database access

## Setup Steps

### 1. Backend Setup

```bash
# Navigate to project root
cd /Users/me/Downloads/repos/hackomania-2026

# Activate virtual environment (if using one)
source .venv/bin/activate

# Install Python dependencies
pip install -r backend/requirements.txt

# Create .env file in backend folder
cat > backend/.env << EOF
APP_NAME=Hackomania API
APP_VERSION=0.1.0
APP_DEBUG=true
CH_HOST=localhost
CH_PORT=8443
CH_USER=default
CH_PASSWORD=your-password
CH_DATABASE=default
CH_SECURE=true
EOF

# Run the backend
cd backend
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

### 2. Frontend Setup

In a **new terminal**:

```bash
# Navigate to frontend
cd /Users/me/Downloads/repos/hackomania-2026/front-end/pab-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## How Local Development Works

### API Proxy Configuration

The `vite.config.js` is configured to proxy API requests:

```javascript
'/api' → 'http://localhost:8000'
```

This means:
- Frontend call: `fetch('/api/health')`
- Gets proxied to: `http://localhost:8000/health`

### Testing Endpoints Locally

1. **Frontend:** http://localhost:5173
2. **Backend API:** http://localhost:8000
3. **API Docs:** http://localhost:8000/docs
4. **Health Check:** http://localhost:8000/health

### Making API Calls from Frontend

```javascript
// This works both locally and in production
fetch('/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Get voice info
fetch('/api/voice-info?limit=10')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Running Both Services

### Option 1: Two Terminals (Recommended)

**Terminal 1 (Backend):**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd front-end/pab-dashboard
npm run dev
```

### Option 2: Single Command (using tmux or screen)

```bash
# Using tmux
tmux new-session -d -s backend 'cd backend && uvicorn app.main:app --reload --port 8000'
tmux new-session -d -s frontend 'cd front-end/pab-dashboard && npm run dev'

# Attach to sessions
tmux attach -t backend   # Ctrl+B, D to detach
tmux attach -t frontend
```

## Environment Variables

### Backend (.env in backend folder)

```env
APP_NAME=Hackomania API
APP_VERSION=0.1.0
APP_DEBUG=true
CH_HOST=your-clickhouse-host
CH_PORT=8443
CH_USER=default
CH_PASSWORD=your-password
CH_DATABASE=default
CH_SECURE=true
```

### Frontend (optional .env in pab-dashboard folder)

```env
VITE_API_URL=/api
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
uvicorn app.main:app --reload --port 8001
# Update vite.config.js proxy target accordingly
```

**Database connection fails:**
- Check ClickHouse is running
- Verify credentials in .env file
- Test connection: `curl http://localhost:8000/db/ping`

### Frontend Issues

**API calls fail:**
- Ensure backend is running on port 8000
- Check browser console for CORS errors
- Verify proxy configuration in vite.config.js

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. Start backend first (for API availability)
2. Start frontend second
3. Make changes to code (hot reload enabled)
4. Test functionality at http://localhost:5173
5. Check API docs at http://localhost:8000/docs

## Production Build Testing

Test production build locally before deploying:

```bash
# Build frontend
cd front-end/pab-dashboard
npm run build

# Preview production build
npm run preview
```

This runs the production build at http://localhost:4173

## Useful Commands

```bash
# Backend - check installed packages
pip list

# Backend - run tests (if you have them)
pytest

# Frontend - check for outdated packages
npm outdated

# Frontend - update dependencies
npm update

# Frontend - build for production
npm run build
```

## Next Steps

Once local development is working:
1. Test all features locally
2. Commit changes to git
3. Follow VERCEL_DEPLOYMENT.md for production deployment
