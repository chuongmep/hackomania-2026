"""
Vercel serverless function entry point for FastAPI
"""
import sys
from pathlib import Path

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_dir))

from app.main import app

# Vercel expects 'app' or 'handler' variable
handler = app
