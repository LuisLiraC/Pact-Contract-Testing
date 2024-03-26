from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from app.database.db import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    game_id = Column(Integer, index=True)

    user = relationship("User", back_populates="favorites")
    game = relationship("Game", back_populates="favorites")