from fastapi import FastAPI, Depends, HTTPException, Body, Path
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Schedulink API",
    description="Smart Appointment Scheduler Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Backend API is running"}

# Create a new user
@app.post("/users", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# List all users
@app.get("/users", response_model=list[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# Create a new slot
@app.post("/slots", response_model=schemas.SlotOut)
def create_slot(slot: schemas.SlotCreate, db: Session = Depends(get_db)):
    new_slot = models.Slot(**slot.dict())
    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot

# List all slots
@app.get("/slots", response_model=list[schemas.SlotOut])
def list_slots(db: Session = Depends(get_db)):
    return db.query(models.Slot).all()

# ✅ Book a slot
@app.patch("/slots/{slot_id}", response_model=schemas.SlotOut)
def book_slot(
    slot_id: int = Path(..., description="ID of the slot to book"),
    user_id: int = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    slot = db.query(models.Slot).filter(models.Slot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    if slot.is_booked:
        raise HTTPException(status_code=400, detail="Slot already booked")
    
    slot.is_booked = True
    slot.user_id = user_id
    db.commit()
    db.refresh(slot)
    return slot

