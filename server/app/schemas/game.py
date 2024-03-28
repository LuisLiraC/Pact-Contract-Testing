from pydantic import BaseModel


class Game(BaseModel):
    id: int
    name: str
    year: int
    thumbnail: str
    primary_color: str
    is_released: bool

    class Config:
        orm_mode = True


class CreateGame(BaseModel):
    name: str
    year: int
    thumbnail: str
    primary_color: str
    is_released: bool
