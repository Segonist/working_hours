from sqlmodel import SQLModel, Field

from decimal import Decimal
from pydantic import BaseModel


class CreateShift(BaseModel):
    id: None
    start_timestamp: int
    end_timestamp: int | None = None
    state: bool
    wage: Decimal


class UpdateShift(BaseModel):
    start_timestamp: int | None = None
    end_timestamp: int | None = None
    state: bool | None = None
    wage: Decimal | None = None


class Shift(SQLModel, table=True):
    __tablename__ = "shifts"

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    start_timestamp: int
    end_timestamp: int | None = None
    state: bool
    wage: Decimal = Field(max_digits=8, decimal_places=2)

    class Config:
        orm_mode = True


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str

    class Config:
        orm_mode = True
