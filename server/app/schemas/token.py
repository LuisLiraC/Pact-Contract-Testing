from pydantic import BaseModel


class TokenData(BaseModel):
    id: int
    exp: int
