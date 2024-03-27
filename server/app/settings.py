from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    JWT_SECRET: str
    JWT_ALGORITHM: str
    IS_TEST_ENV: bool
    RECREATE_DB: bool

    class Config:
        env_file = "../.env"


settings = Settings()
