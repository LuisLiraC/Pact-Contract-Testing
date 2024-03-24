from fastapi import FastAPI, Header, status
from fastapi.responses import JSONResponse
from .database.db import get_db
from .crud import (
    books as books_crud,
    users as users_crud
)
from .schemas.book import (
    Book as BookSchema,
    CreateBook as CreateBookSchema
)
from .schemas.user import (
    CreateUser as CreateUserSchema
)

app = FastAPI()


# @app.middleware("http")
# async def add_process_time_header(request, call_next):
#     if not request.headers.get("authorization"):
#         return JSONResponse(
#             status_code=400,
#             content={"message": "No authorization token"}
#         )
#
#     return await call_next(request)


@app.post("/signup/")
def signup(user: CreateUserSchema):
    db = next(get_db())
    try:
        db_user = users_crud.create_user(db, user)
        return db_user
    except ValueError as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": str(e)}
        )


@app.post("/signin/")
def signin(user: CreateUserSchema):
    db = next(get_db())
    try:
        db_user = users_crud.login_user(db, user.email, user.password)
        return db_user
    except ValueError as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": str(e)}
        )


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/books/", response_model=list[BookSchema])
def read_books():
    db = next(get_db())
    books = books_crud.get_books(db)
    return books


@app.post("/books/", response_model=BookSchema)
def new_book(book: CreateBookSchema):
    db = next(get_db())
    return books_crud.create_book(db, book)


@app.get("/books/{book_id}/", response_model=BookSchema)
def read_book(book_id: int, authorization: str = Header(None)):
    print(authorization)
    db = next(get_db())
    book = books_crud.get_book(db, book_id)
    return book



