from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter()

@router.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).all()
    return appointments

