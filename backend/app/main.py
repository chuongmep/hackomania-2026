from fastapi import FastAPI, Query

from app.config import settings
from app.db import get_client
from app.schemas import HealthResponse, MessageResponse

app = FastAPI(title=settings.app_name, version=settings.app_version, debug=settings.debug)


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


@app.get("/voice-info")
def get_voice_info(
    limit: int = Query(default=20, ge=1, le=200),
    device_id: int | None = Query(default=None),
):
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
