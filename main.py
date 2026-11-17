from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Appliance(BaseModel):
    id: int
    name: str
    power: int
    frequency: int
    price: float
    image: Optional[str] = ""
    video: Optional[str] = ""
    likes: int = 0

db = [
    Appliance(id=1, name="Супер Чайник", power=2000, frequency=50, price=2500, image="http://localhost:9000/s3/teapot.jpg"),
    Appliance(id=2, name="Бэкенд Утюг", power=1500, frequency=50, price=1500)
]

class LoginData(BaseModel):
    username: str
    password: str

@app.post("/api/login")
def login(data: LoginData):
    if data.username == "admin" and data.password == "admin":
        return {"token": "fake-jwt-token-12345"}
    raise HTTPException(status_code=401, detail="Bad credentials")

@app.get("/api/appliances", response_model=List[Appliance])
def get_appliances(minPower: int = 0):
    return [item for item in db if item.power >= minPower]

@app.post("/api/appliances")
def add_appliance(item: Appliance):
    item.id = len(db) + 1
    db.append(item)
    return item

@app.delete("/api/appliances/{item_id}")
def delete_appliance(item_id: int):
    global db
    db = [item for item in db if item.id != item_id]
    return {"ok": True}

@app.post("/api/appliances/{item_id}/like")
def like_appliance(item_id: int):
    for item in db:
        if item.id == item_id:
            item.likes += 1
            return item
    raise HTTPException(status_code=404)
