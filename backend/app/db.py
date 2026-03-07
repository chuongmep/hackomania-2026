import clickhouse_connect

from app.config import settings


def get_client():
    return clickhouse_connect.get_client(
        host=settings.ch_host,
        port=settings.ch_port,
        username=settings.ch_user,
        password=settings.ch_password,
        database=settings.ch_database,
        secure=settings.ch_secure,
    )
