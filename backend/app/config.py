from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = Field(default="Hackomania API", validation_alias="APP_NAME")
    app_version: str = Field(default="0.1.0", validation_alias="APP_VERSION")
    debug: bool = Field(default=False, validation_alias="APP_DEBUG")
    ch_host: str = "localhost"
    ch_port: int = 8443
    ch_user: str = "default"
    ch_password: str = ""
    ch_database: str = "default"
    ch_secure: bool = True

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
