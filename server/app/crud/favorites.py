from typing import Type
from sqlalchemy.orm import Session
from app.models.favorite import Favorite
from app.schemas.favorite import (
    Favorite as FavoriteSchema,
    CreateFavorite as CreateFavoriteSchema
)

def get_favorites(db: Session, user_id: int) -> list[Type[FavoriteSchema]]:
    return db.query(Favorite).filter(Favorite.user_id == user_id).all()


def create_favorite(db: Session, favorite: CreateFavoriteSchema) -> FavoriteSchema:
    db_favorite = Favorite(user_id=favorite.user_id, game_id=favorite.game_id)
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return db_favorite
