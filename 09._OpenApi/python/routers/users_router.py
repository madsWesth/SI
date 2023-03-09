from typing import Union
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    id: int
    name: str

users = [
    {"id": 1, "name": "Sam"},
    {"id": 2, "name": "Tom"},
    {"id": 3, "name": "Bob"},
    {"id": 4, "name": "John"},
    {"id": 5, "name": "Tim"},
    {"id": 6, "name": "Bobby"},
    {"id": 7, "name": "Sammy"},
]

@router.get("/users", response_model=list[User])
def get_users():
    return users

@router.get("/users/{user_id}", response_model=User)
def get_user(user_id: int, q: Union[str, None] = Query("Default", max_length=50)):
    for user in users:
        if user["user_id"] == user_id:
            return user