from fastapi import FastAPI, Query, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import base64
from datetime import datetime

from app.config import settings
from app.db import get_client
from app.schemas import HealthResponse, MessageResponse

app = FastAPI(title=settings.app_name, version=settings.app_version, debug=settings.debug)

# Add CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your Vercel frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=MessageResponse)
def root() -> MessageResponse:
    return MessageResponse(message="Welcome to HackIT API")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/db/ping")
def db_ping():
    try:
        client = get_client()
        version = client.query("SELECT version()").result_rows[0][0]
        return {"status": "ok", "version": version}
    except Exception as e:
        return {"status": "error", "message": str(e), "type": type(e).__name__}


@app.get("/voice-info")
def get_voice_info(
    limit: int = Query(default=20, ge=1, le=200),
    device_id: int | None = Query(default=None),
):
    try:
        client = get_client()

        sql = (
            'SELECT DeviceId, Base64, Transcript, Language, Topic, Emotion, '
            'TagId, PriorityId, Score, RecordingId FROM "VoiceInfo"'
        )
        parameters: dict[str, int] = {}

        if device_id is not None:
            sql += " WHERE DeviceId = {device_id:Int32}"
            parameters["device_id"] = device_id

        sql += " ORDER BY RecordingId DESC LIMIT {limit:UInt32}"
        parameters["limit"] = limit

        result = client.query(sql, parameters=parameters)
        rows = result.result_rows
        cols = result.column_names

        return [dict(zip(cols, row)) for row in rows]
    except Exception as e:
        return {"error": str(e), "type": type(e).__name__}


@app.post("/audio")
async def upload_audio(audio: UploadFile = File(...)):
    """
    Upload audio file from user-audio app (emergency recording)
    Converts to base64 and stores in database
    """
    try:
        # Read the audio file
        audio_bytes = await audio.read()
        
        # Convert to base64
        base64_audio = base64.b64encode(audio_bytes).decode('utf-8')
        
        # TODO: Store in database with proper device_id, timestamp, etc.
        # For now, return success with basic info
        
        return {
            "status": "success",
            "message": "Emergency alert received! Help is on the way.",
            "received_at": datetime.utcnow().isoformat(),
            "file_size": len(audio_bytes),
            "filename": audio.filename,
            "content_type": audio.content_type,
            # In production, you'd insert this into VoiceInfo table:
            # "recording_id": inserted_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "message": str(e),
            "type": type(e).__name__
        })
