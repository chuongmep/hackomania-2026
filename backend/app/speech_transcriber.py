from openai import OpenAI
from langdetect import detect


class SpeechTranscriber:
    def __init__(self, api_key: str, model="gpt-4o-mini-transcribe"):
        self.client = OpenAI(api_key=api_key)
        self.model = model

    async def transcribe(self, audio_file):
        transcription = self.client.audio.transcriptions.create(
            model=self.model,
            file=audio_file,
            response_format="text"
        )

        lang = detect(transcription)
        return lang, transcription