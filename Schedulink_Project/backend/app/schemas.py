from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    email: str
    name: str
    phone: Optional[str]


class UserOut(BaseModel):
    id: int
    email: str
    name: str
    phone: Optional[str]

    class Config:
        from_attributes = True


class SlotCreate(BaseModel):
    start_time: datetime
    end_time: datetime
    user_id: int


class SlotOut(BaseModel):
    id: int
    start_time: datetime
    end_time: datetime
    user_id: int

    class Config:
        from_attributes = True

