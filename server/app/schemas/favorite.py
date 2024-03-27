from typing import Optional
from pydantic import BaseModel
from app.schemas.game import Game

class Favorite(BaseModel):
    id: int
    game: Game


class CreateFavorite(BaseModel):
    user_id: Optional[int] = None
    game_id: int
