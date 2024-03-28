from fastapi import FastAPI, status, Depends
from fastapi.responses import JSONResponse
from app.database.db import get_db
from sqlalchemy import exc
from app.crud import (
    games as games_crud,
    users as users_crud,
    favorites as favorites_crud
)
from app.schemas.game import (
    Game as GameSchema,
    CreateGame as CreateGameSchema,
)
from app.schemas.user import (
    IncomingUser as IncomingUserSchema,
    UserLogged as UserLoggedSchema
)
from app.schemas.favorite import (
    Favorite as FavoriteSchema,
    CreateFavorite as CreateFavoriteSchema
)
from app.schemas.token import TokenData
from app.schemas.response import Response
from app.utils.jwt import create_jwt_token
from app.utils.get_current_user import get_current_user
from app.settings import settings


if settings.RECREATE_DB:
    from app.database.db import Base, engine
    Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.middleware("http")
async def add_process_time_header(request, call_next):
    if settings.IS_TEST_ENV:
        custom_header = request.headers.get("x-riddle")

        if not custom_header:
            return JSONResponse(
                status_code=400,
                content={"message": "Missing x-riddle header"}
            )

        if custom_header != "mellon":
            return JSONResponse(
                status_code=400,
                content={"message": "Speak friend and enter"}
            )

    return await call_next(request)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/signup/", response_model=Response[UserLoggedSchema], status_code=status.HTTP_201_CREATED)
def signup(user: IncomingUserSchema):
    try:
        db = next(get_db())
        db_user = users_crud.create_user(db, user)
        token = create_jwt_token({"id": db_user.id})
        user_logged = UserLoggedSchema(token=token, user=db_user)
        return Response(data=user_logged)
    except ValueError as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": str(e)}
        )


@app.post("/signin/", response_model=Response[UserLoggedSchema], status_code=status.HTTP_200_OK)
def signin(user: IncomingUserSchema):
    try:
        db = next(get_db())
        db_user = users_crud.login_user(db, user)
        token = create_jwt_token({"id": db_user.id})
        user_logged = UserLoggedSchema(token=token, user=db_user)
        return Response(data=user_logged)
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": str(e)}
        )


@app.get("/games/", response_model=Response[GameSchema], status_code=status.HTTP_200_OK)
def read_games():
    try:
        db = next(get_db())
        games = games_crud.get_games(db)

        if not games:
            raise exc.NoResultFound

        return Response(data=games)
    except exc.NoResultFound:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "Games not found"}
        )


@app.post("/games/", response_model=Response[GameSchema], status_code=status.HTTP_201_CREATED)
def new_game(game: CreateGameSchema, _: TokenData = Depends(get_current_user)):
    try:
        db = next(get_db())
        inserted_game = games_crud.create_game(db, game)
        return Response(data=inserted_game)
    except exc.IntegrityError:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": "Game already exists"}
        )


@app.get("/games/{game_id}/", response_model=Response[GameSchema], status_code=status.HTTP_200_OK)
def read_game(game_id: int, _: TokenData = Depends(get_current_user)):
    try:
        db = next(get_db())
        game = games_crud.get_game(db, game_id)

        if not game:
            raise exc.NoResultFound

        return Response(data=game)
    except exc.NoResultFound:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "Game not found"}
        )

@app.get("/favorites/", response_model=Response[FavoriteSchema], status_code=status.HTTP_200_OK)
def read_favorites(current_user: TokenData = Depends(get_current_user)):
    try:
        db = next(get_db())
        favorites = favorites_crud.get_favorites(db, current_user.id)

        if not favorites:
            raise exc.NoResultFound

        return Response(data=favorites)
    except exc.NoResultFound:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "Favorites not found"}
        )


@app.post("/favorites/", response_model=Response[FavoriteSchema], status_code=status.HTTP_201_CREATED)
def new_favorite(favorite: CreateFavoriteSchema, current_user: TokenData = Depends(get_current_user)):
    try:
        create_favorite = CreateFavoriteSchema(user_id=current_user.id, game_id=favorite.game_id)
        db = next(get_db())
        inserted_favorite = favorites_crud.create_favorite(db, create_favorite)
        return Response(data=inserted_favorite)
    except exc.IntegrityError:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": "Favorite already exists"}
        )
    except exc.NoResultFound:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"error": "Game not found"}
        )
