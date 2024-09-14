from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from sqlmodel import Session, select, func

from models import Shift
from database import engine

router = APIRouter()


@router.get("/api/shifts")
async def get_all_shifts():
    # TODO ПОВЕРНУТИ ТІЛЬКИ ТЕ, ДО ЧОГО КОРИСТУВАЧ МАЄ ДОСТУП
    with Session(engine) as session:
        statement = select(Shift)
        shifts = session.exec(statement).all()

    return shifts


@router.post("/api/shift")
async def create_shift(shift: Shift):
    # TODO КОРИЧСТУВАЧ МАЄ БУТИ АВТОРИЗОВАНИМ ЩОБ СТВОРИТИ
    with Session(engine) as session:
        session.add(shift)
        session.commit()
        id = shift.id

    return {"id": id}


@router.get("/api/shift/{shift_id}", response_model=Shift)
# if shift_id is 0, it will return last entry for this user
async def read_shift(shift_id: int):
    # TODO КОРИЧСТУВАЧ МАЄ МАТИ ДОСТУП ДО ВПИСУ ЩОБ ПРОЧИТАТИ
    with Session(engine) as session:
        if shift_id == 0:
            statement = select(func.max(Shift.id))
            shift_id = session.exec(statement).one()
            # SQL MAX() returns max value or NULL, so .one() is not throwing an exception
            if shift_id is None:
                return {}

        shift = session.get(Shift, shift_id)

    return shift


@router.put("/api/shift/{shift_id}")
async def update_shift(shift_id: int, shift: Shift):
    # TODO КОРИЧСТУВАЧ МАЄ МАТИ ДОСТУП ДО ВПИСУ ЩОБ ЗМІНИТИ
    shift = dict(shift)
    with Session(engine) as session:
        existing_shift = session.get(Shift, shift_id)

        for key, value in shift.items():
            if value is not None:
                setattr(existing_shift, key, value)

        session.add(existing_shift)
        session.commit()

    return HTMLResponse(status_code=200)


@router.delete("/api/shift/{shift_id}")
async def delete_shift(shift_id: int):
    # TODO КОРИЧСТУВАЧ МАЄ МАТИ ДОСТУП ДО ВПИСУ ЩОБ ВИДАЛИТИ
    with Session(engine) as session:
        shift = session.get(Shift, shift_id)
        session.delete(shift)
        session.commit()

    return {HTMLResponse(status_code=200)}
