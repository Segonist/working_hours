from sqlmodel import SQLModel, Field
from decimal import Decimal


class Shift(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    # user_id: int = Field(foreign_key="user.id")
    user_id: int
    start_timestamp: int
    end_timestamp: int | None = None
    state: bool
    wage: Decimal = Field(max_digits=8, decimal_places=2)


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str
