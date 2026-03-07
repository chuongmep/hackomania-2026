import json
from openai import OpenAI
from pydantic import BaseModel

SYSTEM_PROMPT = (
    "You are a medical distress-call scoring engine. You receive a transcript "
    "of a patient's distress call and must calculate a single numeric RiskScore and matching keyword in the transcript that you have found\n"
    "\n"
    "## Scoring Tables\n"
    "\n"
    "{DATA_BASE}\n"
    "\n"
    "## Instructions\n"
    "If the transcript is not in english, please translate it to english and compare it\n"
    "Analyze the transcript step by step:\n"
    "\n"
    "1. **Keyword Severity** — Scan the transcript for keywords listed in "
    "`keyword_severity_scores`. Sum the Score of every matched keyword. "
    "If a keyword appears multiple times, count it once.\n"
    "\n"
    "2. **Medical Risk** — Identify any medical conditions or symptoms described "
    "in the transcript that match entries in `medical_risk_scores`. Sum their scores.\n"
    "\n"
    "3. **Voice Distress** — Evaluate the transcript for distress signals listed in "
    "`voice_distress_scores` (e.g. urgency, panic, confusion, pain indicators). "
    "Sum their scores.\n"
    "\n"
    "4. **Weighted Final Score** — Combine the three sub-scores using the weights "
    "from `risk_score_weights`:\n"
    "   FinalRiskScore = (KeywordSeverity * weight_keyword) + "
    "(MedicalRisk * weight_medical) + (VoiceDistress * weight_voice)\n"
    "\n"
    "## Rules\n"
    "\n"
    "- Only use keywords and conditions that are explicitly present in the scoring "
    "tables. Do not invent new ones.\n"
    "- Match keywords case-insensitively. Accept close morphological variants "
    '(e.g. "bleeding" matches "bleed").\n'
    "- If nothing in the transcript matches a scoring table, that sub-score is 0.\n"
    "- Return the final weighted RiskScore as a single number, rounded to two "
    "decimal places."
)


class RiskScore(BaseModel):
    score: float
    matching_keyword: list[str]


class AgentScore:
    def __init__(self, api_key, model='gpt-5.1'):
        self._client = OpenAI(api_key=api_key)
        self._model = model

    def calculate(self, transcript: str, scoring_data: dict):
        system_prompt = SYSTEM_PROMPT.replace("{DATA_BASE}", json.dumps(scoring_data, indent=2))
        response = self._client.responses.parse(
            model=self._model,
            input=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": transcript,
                },
            ],
            text_format=RiskScore
        )

        output = response.output_parsed
        return output.score, output.matching_keyword