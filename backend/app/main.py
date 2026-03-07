from fastapi import FastAPI, Query, UploadFile, File, Form
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

# Speech detection endpoint
@app.post("/detect")
async def detect_speech(
        device_id: int | None = Query(default=None),
        file: UploadFile = File(...)):
    audio_bytes = await file.read()
    text = await speech_transcriber.transcribe((file.filename, audio_bytes, file.content_type))
    return {"transcript": text}

# Database functions
# Check if the database connection is working and get the ClickHouse version.
@app.get("/db/ping")
def db_ping():
    client = get_client()
    version = client.query("SELECT version()").result_rows[0][0]
    return {"status": "ok", "version": version}

# Save VoiceInfo to database
@app.post("/db/voiceinfo")
def post_voice_info(
    device_id: str = Form(...), 
    base64_audio: str = Form(...), 
    transcript: str = Form(...),
):
    client = get_client()
    client.insert("VoiceInfo", [[ device_id, base64_audio, transcript]], column_names=["DeviceId", "Base64", "Transcript"])
    # client.query(
    #     f"INSERT INTO VoiceInfo (DeviceId, Base64, Transcript) VALUES ({device_id}, {base64_audio}, {transcript})"
    # )
    return {"status": "ok", "message": "VoiceInfo saved successfully."}
    
# Get all VoiceInfo records
@app.get("/db/voiceinfo")
def get_voice_info():
    client = get_client()
    result = client.query("SELECT * FROM VoiceInfo").result_rows
    return {"status": "ok", "data": result}


# Retrieve User Info based on Device ID
@app.get("/db/devices")
def get_device_info(device_id: str = Form(...)):
    client = get_client()
    result = client.query(f"SELECT * FROM Devices WHERE DeviceId == '{device_id}'").result_rows
    return {"status": "ok", "data": result}

# Retrieve emergency contacts based on Device ID
@app.get("/db/emergency_contacts")
def get_emergency_contacts(device_id: str = Form(...)):
    client = get_client()
    result = client.query(f"SELECT * FROM EmergencyContacts WHERE DeviceId == '{device_id}'").result_rows
    return {"status": "ok", "data": result}

# Retrieve Risk Assessment data from DB
@app.get("/db/risk_assessment")
def get_risk_assessment():
    client = get_client()
    keyword_severity = client.query("SELECT * FROM KeywordSeverityScore").result_rows
    medical_risk = client.query("SELECT * FROM MedicalRiskScore").result_rows
    voice_distress = client.query("SELECT * FROM VoiceDistressScore").result_rows
    risk_score_weights = client.query("SELECT * FROM RiskScoreWeights").result_rows
    return {"status": "ok", "data": {
        "keyword_severity": keyword_severity,
        "medical_risk": medical_risk,
        "voice_distress": voice_distress,
        "risk_score_weights": risk_score_weights
    }}
