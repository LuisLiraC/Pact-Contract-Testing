from pydantic import BaseModel


class Game(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class CreateGame(BaseModel):
    name: str
