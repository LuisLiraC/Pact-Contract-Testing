from typing import Type
from sqlalchemy.orm import Session
from app.models.game import Game
from app.schemas.game import (
    Game as GameSchema,
    CreateGame as CreateGameSchema
)


def get_games(db: Session) -> list[Type[GameSchema]]:
    return db.query(Game).all()


def get_game(db: Session, game_id: int) -> GameSchema:
    return db.query(Game).filter(Game.id == game_id).first()


def create_game(db: Session, game: CreateGameSchema) -> GameSchema:
    db_game = Game(**game.dict())
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game