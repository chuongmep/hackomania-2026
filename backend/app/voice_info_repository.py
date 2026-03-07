from clickhouse_connect.driver import Client
from enum import Enum


class Priority:
    def __init__(self, name: str, value: int):
        self.name = name
        self.value = value


class VoiceInfoRepository:
    def __init__(self, client: Client):
        self.client = client

    def insert(self, device_id: str, base64_audio: str, transcript: str, score: float):
        self.client.insert(
            "VoiceInfo",
            [[device_id, base64_audio, transcript, score]],
            column_names=["DeviceId", "Base64", "Transcript", "RiskScore"],
        )

    def _query_as_dicts(self, query: str) -> list[dict]:
        result = self.client.query(query)
        columns = result.column_names
        return [dict(zip(columns, row)) for row in result.result_rows]

    def get_scoring_config(self) -> dict:
        return {
            "keyword_severity_scores": self._query_as_dicts("SELECT * FROM KeywordSeverityScore"),
            "medical_risk_scores": self._query_as_dicts("SELECT * FROM MedicalRiskScore"),
            "voice_distress_scores": self._query_as_dicts("SELECT * FROM VoiceDistressScore"),
            "risk_score_weights": self._query_as_dicts("SELECT * FROM RiskScoreWeights"),
        }

    def get_priorities(self) -> list[Priority]:
        result = self.client.query("SELECT Risk, RiskScore FROM Priority ORDER BY RiskScore ASC")
        return [Priority(name=row[0], value=row[1]) for row in result.result_rows]

    def get_emergency_contacts(self, device_id):
        return self._query_as_dicts(f"SELECT * FROM EmergencyContacts WHERE DeviceId == '{device_id}'")

