from sqlalchemy.orm import Session
from ..models.user import User
from ..schemas.user import CreateUser as CreateUserSchema
from passlib.context import CryptContext
from ..utils.jwt import create_jwt_token


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_hashed_password(password):
    return pwd_context.hash(password)


def get_user(db: Session, user_email: str):
    return db.query(User).filter(User.email == user_email).first()


def login_user(db: Session, user_email: str, password: str):
    user = get_user(db, user_email)
    if not user or not verify_password(password, user.hashed_password):
        raise ValueError("Invalid credentials")
    token = create_jwt_token({"id": user.id})
    return {"token": token}


def create_user(db: Session, user: CreateUserSchema):
    if get_user(db, user.email):
        raise ValueError("User already exists")

    hashed_password = get_hashed_password(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    token = create_jwt_token({"id": db_user.id})
    return {"token": token}
