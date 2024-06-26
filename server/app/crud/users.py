from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import IncomingUser as IncomingUserSchema
from passlib.context import CryptContext
from app.schemas.user import User as UserSchema

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_hashed_password(password):
    return pwd_context.hash(password)


def get_user(db: Session, user_email: str):
    return db.query(User).filter(User.email == user_email).first()


def login_user(db: Session, incoming_user: IncomingUserSchema) -> UserSchema:
    user = get_user(db, incoming_user.email)
    if not user or not verify_password(incoming_user.password, user.hashed_password):
        raise ValueError("Invalid credentials")
    return UserSchema(id=user.id, email=user.email)


def create_user(db: Session, user: IncomingUserSchema) -> UserSchema:
    if get_user(db, user.email):
        raise ValueError("User already exists")

    hashed_password = get_hashed_password(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return UserSchema(id=db_user.id, email=db_user.email)
