from sqlmodel import SQLModel, Field
from decimal import Decimal
from datetime import datetime


class Shift(SQLModel, table=True):
    __tablename__ = "shifts"

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    start_timestamp: int
    end_timestamp: int | None = None
    state: bool
    wage: Decimal = Field(max_digits=8, decimal_places=2)


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str
