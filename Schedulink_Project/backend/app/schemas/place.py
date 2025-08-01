from pydantic import BaseModel

class PlaceBase(BaseModel):
    name: str
    address: str
    city: str
    state: str
    zip_code: str

class PlaceCreate(PlaceBase):
    pass

class Place(PlaceBase):
    id: int

    class Config:
        orm_mode = True

