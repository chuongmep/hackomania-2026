from fastapi import FastAPI

from app.config import settings
from app.schemas import HealthResponse, MessageResponse

app = FastAPI(title=settings.app_name, version=settings.app_version, debug=settings.debug)


@app.get("/", response_model=MessageResponse)
def root() -> MessageResponse:
    return MessageResponse(message="Welcome to Hackomania API")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")
