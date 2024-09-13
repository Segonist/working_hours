from sqlmodel import SQLModel, Field


class Shift(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    # user_id: int = Field(foreign_key="user.id")
    user_id: int
    start_timestamp: int
    end_timestamp: int | None = None
    state: bool
    wage: float
