"""
Vercel serverless function entry point
This file is required for Vercel to recognize the Python backend
"""
from app.main import app

# Export the FastAPI app for Vercel
handler = app
