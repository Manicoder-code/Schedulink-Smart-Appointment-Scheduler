from pydantic import BaseModel
from datetime import datetime

class SlotBase(BaseModel):
    start_time: datetime
    end_time: datetime

class SlotCreate(SlotBase):
    user_id: int

class Slot(SlotBase):
    id: int
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    slots: list[Slot] = []
    class Config:
        orm_mode = True
