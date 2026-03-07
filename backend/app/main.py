import base64
from fastapi import FastAPI, Form, UploadFile, File
from app.config import settings
from app.db import get_client
from app.schemas import HealthResponse, MessageResponse
from app.speech_transcriber import SpeechTranscriber
from app.agent_score import AgentScore
from app.voice_info_repository import VoiceInfoRepository
from app.utils import resolve_priority

app = FastAPI(title=settings.app_name, version=settings.app_version, debug=settings.debug)
speech_transcriber = SpeechTranscriber(settings.open_api_key)
client = get_client()
voice_info_repo = VoiceInfoRepository(client)
agent_score = AgentScore(settings.open_api_key)


@app.get("/", response_model=MessageResponse)
def root() -> MessageResponse:
    return MessageResponse(message="Welcome to HackIT API")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/db/ping")
def db_ping():
    version = client.query("SELECT version()").result_rows[0][0]
    return {"status": "ok", "version": version}


@app.get("/db/emergency_contacts")
def get_emergency_contacts(device_id: str = Form(...)):
    result = voice_info_repo.get_emergency_contacts(device_id)
    return {"status": "ok", "data": result}


@app.get("/db/voice_info")
def get_voice_info(device_id: str = Form(...), is_resolved: bool = Form(...)):
    result = voice_info_repo.get_voice_info(device_id, is_resolved)
    return {"status": "ok", "data": result}


@app.get("/db/voice_infos")
def get_voice_info():
    result = voice_info_repo.get_voice_infos()
    return {"status": "ok", "data": result}


@app.post("/detect")
async def detect_speech(
        device_id: str = Form(...),
        file: UploadFile = File(...)):
    audio_bytes = await file.read()
    audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")

    transcript = await speech_transcriber.transcribe((file.filename, audio_bytes, file.content_type))
    scoring_config = voice_info_repo.get_scoring_config()
    priorities = voice_info_repo.get_priorities()
    lang ,score, matching_keyword = agent_score.calculate(transcript, scoring_config)
    priority = resolve_priority(priorities, score)

    voice_info_repo.insert(device_id, audio_base64, transcript, lang, score, priority)

    return {"lang": lang, "transcript": transcript, "device_id": device_id, "score": score, "priority": priority,"matching_keyword": matching_keyword}


@app.put("/db/voice_info/resolve")
def resolve_voice_info(device_id: str = Form(...), resolved: bool = Form(...)):
    voice_info_repo.update_resolved(device_id, resolved)
    return {"status": "ok", "device_id": device_id, "resolved": resolved}


@app.get("/scoring-config")
def get_scoring_config():
    return voice_info_repo.get_scoring_config()
