from sqlalchemy.orm import Session
from ..models.book import Book
from ..schemas.book import CreateBook as CreateBookSchema


def get_books(db: Session):
    return db.query(Book).all()


def get_book(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()


def create_book(db: Session, book: CreateBookSchema):
    db_book = Book(title=book.title)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book
