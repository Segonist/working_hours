from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from sqlmodel import Session, select, func

from models import Shift, CreateShift, UpdateShift
from database import engine
from auth import user_dependency

router = APIRouter()


@router.get("/api/shifts")
async def get_all_shifts(user: user_dependency):
    with Session(engine) as session:
        statement = select(Shift).where(Shift.user_id == user.id)
        shifts = session.exec(statement).all()

    return shifts


@router.post("/api/shift")
async def create_shift(shift: CreateShift, user: user_dependency):
    with Session(engine) as session:
        shift_data = shift.model_dump()
        shift_data["user_id"] = user.id
        new_shift = Shift(**shift_data)

        session.add(new_shift)
        session.commit()

        session.refresh(new_shift)
        id = new_shift.id

    return {"id": id}


@router.get("/api/shift/{shift_id}", response_model=Shift)
# if shift_id is 0, it will return last entry for this user
async def read_shift(shift_id: int, user: user_dependency):
    with Session(engine) as session:
        if shift_id == 0:
            shift_id_statement = select(func.max(Shift.id)).where(
                Shift.user_id == user.id)
            shift_id = session.exec(shift_id_statement).first()
            statement = select(Shift).where(
                Shift.user_id == user.id).where(Shift.id == shift_id)
        else:
            statement = select(Shift).where(Shift.id == shift_id)

        shift = session.exec(statement).first()
        if not shift:
            return HTMLResponse(status_code=404)
        if shift.user_id != user.id:
            return HTMLResponse(status_code=403)

    return shift


@router.put("/api/shift/{shift_id}")
async def update_shift(shift_id: int, shift: UpdateShift, user: user_dependency):
    with Session(engine) as session:
        existing_shift = session.get(Shift, shift_id)

        if not existing_shift:
            return HTMLResponse(status_code=404)

        if existing_shift.user_id != user.id:
            return HTMLResponse(status_code=403)

        shift_data = shift.model_dump(exclude_unset=True)
        shift_data["id"] = shift_id
        for key, value in shift_data.items():
            setattr(existing_shift, key, value)

        session.add(existing_shift)
        session.commit()

    return HTMLResponse(status_code=200)


@router.delete("/api/shift/{shift_id}")
async def delete_shift(shift_id: int, user: user_dependency):
    with Session(engine) as session:
        shift = session.get(Shift, shift_id)

        if not shift:
            return HTMLResponse(status_code=404)

        if shift.user_id != user.id:
            return HTMLResponse(status_code=403)

        session.delete(shift)
        session.commit()

    return HTMLResponse(status_code=200)
