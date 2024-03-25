from jose import jwt
from datetime import datetime, timedelta
from app.settings import settings


def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def verify_jwt_token(token: str):
    try:
        decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return decoded_token
    except jwt.JWTError:
        return None
