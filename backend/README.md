# Backend API (FastAPI)

Simple FastAPI backend for Hackomania 2026.

## Requirements

- Python 3.10+
- `pip`

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Environment Variables

Create/update `backend/.env`:

```env
APP_NAME=Hackomania API
APP_VERSION=0.1.0
DEBUG=true
```

## Run the Server

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

Server default URL: `http://127.0.0.1:8000`

## API Endpoints

- `GET /` - welcome message
- `GET /health` - health check
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc

## Project Structure

```text
backend/
  app/
    config.py      # app settings loaded from .env
    main.py        # FastAPI app + routes
    schemas.py     # response models
  sql/
    init_clickhouse.sql
  .env
  requirements.txt
```
