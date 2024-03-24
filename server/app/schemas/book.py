from pydantic import BaseModel


class Book(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True


class CreateBook(BaseModel):
    title: str
