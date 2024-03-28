from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database.db import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    year = Column(Integer)
    thumbnail = Column(String)
    primary_color = Column(String)
    is_released = Column(Boolean, default=True)

    favorites = relationship("Favorite", back_populates="game")
