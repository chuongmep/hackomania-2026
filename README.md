# hackomania-2026
Hackomania 2026 HackIT Team

## 📋 Project Overview

This project consists of a comprehensive emergency response system with:
- **PAB Dashboard**: Real-time monitoring dashboard for emergency alerts
- **User Audio Recorder**: Voice recording interface for emergency reports
- **Backend API**: Python FastAPI backend for data management

## Sytem Architecture

![System Architecture Diagram](./docs/system-architecture.png)

## 🚀 Quick Start - Deployment

Deploy both frontends to a single domain:

```bash
# Quick deploy to Vercel
vercel --prod
```

**Access URLs after deployment:**
- Main Dashboard: `https://yourdomain.com`
- User Audio: `https://yourdomain.com/user.html`

📖 **Detailed deployment guide**: See [DEPLOY_QUICK.md](DEPLOY_QUICK.md) or [DEPLOYMENT.md](DEPLOYMENT.md)

## 🛠️ Local Development

### Frontend - PAB Dashboard
```bash
cd front-end/pab-dashboard
npm install
npm run dev
```

### Frontend - User Audio
```bash
cd front-end/user-audio
npm install
npm start
```

### Backend
```bash
cd backend
source .venv/bin/activate  # or: .venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📁 Project Structure

```
├── backend/              # FastAPI backend
├── front-end/
│   ├── pab-dashboard/   # Main dashboard (Vite + React)
│   └── user-audio/      # Audio recorder (Create React App)
├── docs/                # Documentation
├── deploy.sh            # Combined build script
├── vercel.json          # Deployment configuration
└── DEPLOYMENT.md        # Detailed deployment guide
```

## 🌐 Deployment

The project uses a unified deployment strategy where both frontends are combined:
1. PAB Dashboard serves at the root (`/`)
2. User Audio serves at `/user.html`

Run `./deploy.sh` to build both apps into a single `dist-combined/` directory.

## 📝 License

See [LICENSE](LICENSE) for details.
