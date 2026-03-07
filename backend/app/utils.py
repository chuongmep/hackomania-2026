import base64
from fastapi import FastAPI, UploadFile, File


def mp3_to_base64(file_path: str):
    with open(file_path, "rb") as f:
        mp3_bytes = f.read()
    return base64.b64encode(mp3_bytes)


def mp3_to_data_url(file_path: str) -> str:
    b64 = mp3_to_base64(file_path)
    return f'data:audio/mpeg;base64,{b64}'
