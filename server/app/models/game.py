from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
