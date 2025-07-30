from fastapi import FastAPI
from app.routers import users, appointments

app = FastAPI()

app.include_router(users.router, prefix="/users")
app.include_router(appointments.router, prefix="/slots")

@app.get("/")
def root():
    return {"message": "Welcome to Schedulink"}
