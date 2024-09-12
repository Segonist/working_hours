from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import sqlite3

router = APIRouter()


@router.get("/api/shifts")
async def get_all_shifts():
    # TODO ПРЯМ ЗОВСІМ ЗМІНИТИ КОЛИ ДОДАТИ АВТЕНТИФІКАЦІЮ
    connection = sqlite3.connect("database/working_hours.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    responce = cursor.execute("SELECT * FROM shift")
    responce = responce.fetchall()
    connection.close()

    return {"data": responce}


@router.post("/api/shift")
async def create_shift(shift: dict):
    connection = sqlite3.connect("database/working_hours.db")
    cursor = connection.cursor()
    cursor.execute("INSERT INTO shift (user_id, start_timestamp, end_timestamp, state, wage) \
                                VALUES (:user_id, :start_timestamp, :end_timestamp, :state, :wage)", shift)
    connection.commit()
    id = cursor.lastrowid
    connection.close()

    return {"id": id}


@router.get("/api/shift/{shift_id}")
async def read_shift(shift_id: int | str):
    user_id = 0  # TODO CHANGE WHEN ADD AUTH
    if type(shift_id) != int and shift_id != "last":
        return HTMLResponse(status_code=404)

    connection = sqlite3.connect("database/working_hours.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    if shift_id == "last":
        responce = cursor.execute(
            "SELECT MAX(id) FROM shift WHERE user_id = ?", (user_id,))
        shift_id = responce.fetchone()[0]

    responce = cursor.execute("SELECT * FROM shift WHERE id = ?", (shift_id,))
    responce = responce.fetchone()
    connection.close()

    return {responce}


@router.put("/api/shift/{shift_id}")
async def update_shift(shift_id: int, shift: dict):
    connection = sqlite3.connect("database/working_hours.db")
    cursor = connection.cursor()

    shift = dict(shift)
    set_string = ", ".join(
        [f"{column} = :{column}" for column in shift.keys()])
    shift["id"] = shift_id

    cursor.execute(f"UPDATE shift SET {set_string} \
                   WHERE id = :id", shift)
    connection.commit()
    connection.close()

    return HTMLResponse(status_code=200)


@router.delete("/api/shift/{shift_id}")
async def delete_shift(shift_id: int):
    connection = sqlite3.connect("database/working_hours.db")
    cursor = connection.cursor()

    cursor.execute("DELETE FROM shift WHERE id = ?", (shift_id,))
    connection.commit()
    connection.close()

    return {HTMLResponse(status_code=200)}
