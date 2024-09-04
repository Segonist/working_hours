from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse

from pathlib import Path

import routers.shifts

app = FastAPI()


app.include_router(routers.shifts.router)


@app.get(f"/", response_class=HTMLResponse)
async def home_page():
    with open(f"../frontend/home.html", "r", encoding="UTF-8") as file:
        return file.read()


@app.get("/{file_name}", response_class=FileResponse)
async def get_file(file_name: str):
    file = Path(f"../frontend/{file_name}")
    if file.is_file():
        return file
    else:
        return HTMLResponse(status_code=404)
