from sqlalchemy.orm import Session
from app.models.game import Game
from app.schemas.game import CreateGame as CreateGameSchema


def get_games(db: Session):
    return db.query(Game).all()


def get_game(db: Session, game_id: int):
    return db.query(Game).filter(Game.id == game_id).first()


def create_game(db: Session, game: CreateGameSchema):
    db_game = Game(name=game.name)
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game