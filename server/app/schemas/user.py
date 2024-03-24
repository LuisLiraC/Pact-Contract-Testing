from pydantic import BaseModel


class User(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str


class CreateUser(BaseModel):
    email: str
    password: str
