from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from passlib.context import CryptContext
from pydantic import BaseModel
import jwt
from jwt.exceptions import InvalidTokenError
import os

from datetime import datetime, timedelta, timezone
from typing_extensions import Annotated

from models import User
from database import engine

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    return pwd_context.hash(password)


def get_user(username: str):
    with Session(engine) as session:
        statement = select(User).where(User.username == username)
        user = session.exec(statement).first()
        return user


def create_user(username: str, password: str):
    with Session(engine) as session:
        hashed_password = get_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    return new_user


def user_excist(username):
    user = get_user(username)
    if user:
        return True
    return False


def create_user(username: str, password: str):
    with Session(engine) as session:
        hashed_password = get_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
    return new_user


def user_excist(username):
    user = get_user(username)
    if user:
        return True
    return False


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        SECRET_KEY = os.getenv("SECRET_KEY")
        ALGORITHM = os.getenv("ALGORITHM")
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        username = payload.get("sub")
        if username is not None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception

    user = get_user(token_data.username)
    if user is None:
        return credentials_exception

    return user


@router.post("/api/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token_expires = timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        {"sub": user.username}, access_token_expires)

    return Token(access_token=access_token, token_type="bearer")


@router.post("/api/user")
async def register_user(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    if user_excist(username):
        raise HTTPException(
            status_code=409,
            detail="User already excist",
        )
    new_user = create_user(username, password)

    access_token_expires = timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        {"sub": new_user.username}, access_token_expires)

    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user
