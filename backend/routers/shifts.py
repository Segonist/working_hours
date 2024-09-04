from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import sqlite3

from pydantic import BaseModel
from enum import Enum

router = APIRouter()


class State(int, Enum):
    NOT_ENDED = 0
    ENDED = 1


class Shift(BaseModel):
    id: int | None
    user_id: int
    start_timestamp: int
    end_timestamp: int | None
    state: State
    wage: float


class Shift_state0(BaseModel):
    id: None = None
    user_id: int
    start_timestamp: int
    end_timestamp: None = None
    state: State
    wage: float


class Shift_state1(BaseModel):
    id: int
    end_timestamp: int
    state: State


@router.post("/api/shift")
async def create_shift(shift: Shift_state0 | Shift):
    connection = sqlite3.connect("database/working_hours.db")
    cursor = connection.cursor()
    cursor.execute("INSERT INTO shift (user_id, start_timestamp, end_timestamp, state, wage) \
                                VALUES (:user_id, :start_timestamp, :end_timestamp, :state, :wage)", dict(shift))
    connection.commit()
    cursor.close()

    return HTMLResponse(status_code=200)


@router.get("/api/shift/{shift_id}")
async def read_shift(shift_id: int):
    return {"shift_id": shift_id, "method": "get"}


@router.put("/api/shift/{shift_id}")
async def update_shift(shift_id: int, shift: Shift_state1 | Shift):
    return {"shift_id": shift_id, "shift": shift, "method": "put"}


@router.delete("/api/shift/{shift_id}")
async def delete_shift(shift_id: int):
    return {"shift_id": shift_id, "method": "delete"}
