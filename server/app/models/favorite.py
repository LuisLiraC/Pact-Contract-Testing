from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database.db import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    game_id = Column(Integer, ForeignKey("games.id"))

    user = relationship("User", back_populates="favorites")
    game = relationship("Game", back_populates="favorites")

    __table_args__ = (
        UniqueConstraint("user_id", "game_id", name="unique_user_game"),
    )
