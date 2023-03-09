from typing import Union
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

class Spacecraft(BaseModel):
    id: int
    name: str

spacecrafts = [
    {"id": 1, "name": "Voyager 1"},
    {"id": 2, "name": "Voyager 2"},
    {"id": 3, "name": "Cassini"},
    {"id": 4, "name": "Pioneer 10"},
    {"id": 5, "name": "Pioneer 11"},
    {"id": 6, "name": "New Horizons"},
    {"id": 7, "name": "Juno"},
]

@router.get("/spacecrafts/{spacecraft_id}", response_model=Spacecraft)
def get_spacecraft(spacecraft_id: int, q: Union[str, None] = Query("Default", max_length=50)):
    for spacecraft in spacecrafts:
        if spacecraft["spacecraft_id"] == spacecraft_id:
            return spacecraft

@router.post("/spacecrafts", response_model=Spacecraft)
def add_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft
