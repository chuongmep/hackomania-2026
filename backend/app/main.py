from fastapi import FastAPI, Query, UploadFile, File
from app.config import settings
from app.db import get_client
from app.schemas import HealthResponse, MessageResponse
from app.speech_transcriber import SpeechTranscriber

app = FastAPI(title=settings.app_name, version=settings.app_version, debug=settings.debug)
speech_transcriber = SpeechTranscriber(settings.open_api_key)


@app.get("/", response_model=MessageResponse)
def root() -> MessageResponse:
    return MessageResponse(message="Welcome to HackIT API")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/db/ping")
def db_ping():
    client = get_client()
    version = client.query("SELECT version()").result_rows[0][0]
    return {"status": "ok", "version": version}


@app.post("/detect")
async def detect_speech(
        device_id: int | None = Query(default=None),
        file: UploadFile = File(...)):
    audio_bytes = await file.read()
    text = await speech_transcriber.transcribe((file.filename, audio_bytes, file.content_type))
    return {"transcript": text}
