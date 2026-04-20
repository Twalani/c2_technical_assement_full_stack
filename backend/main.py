from fastapi import Depends, FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from cachetools import TTLCache
import models
import schemas
from database import Base, SessionLocal, engine
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

API_KEY = os.getenv("API_KEY")

def verify_api_key(x_api_key: str = Header(...)) -> None:
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")

cache = TTLCache(maxsize=100, ttl=60)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task API",
    version="1.0.0",
    # dependencies=[Depends(verify_api_key)],
)
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_task_or_404(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

def clear_tasks_cache():
    cache.pop("tasks", None)

# =========================
# CREATE TASK
# =========================
@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), _: None = Depends(verify_api_key), ):
    new_task = models.Task(**task.dict())

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    clear_tasks_cache()
    return new_task


# =========================
# GET ALL TASKS
# =========================
@app.get("/tasks", response_model=list[schemas.Task])
def get_tasks(db: Session = Depends(get_db),_: None = Depends(verify_api_key),):
    if "tasks" in cache:
        return cache["tasks"]

    tasks = db.query(models.Task).all()
    cache["tasks"] = tasks

    return tasks


# =========================
# GET SINGLE TASK
# =========================
@app.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db),_: None = Depends(verify_api_key),):
    return get_task_or_404(db, task_id)


# =========================
# UPDATE TASK
# =========================
@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int,
    task: schemas.TaskUpdate,
    db: Session = Depends(get_db),_: None = Depends(verify_api_key),
):
    db_task = get_task_or_404(db, task_id)

    db_task.title = task.title
    db_task.description = task.description
    db_task.completed = task.completed

    db.commit()
    db.refresh(db_task)

    clear_tasks_cache()

    return db_task


# =========================
# DELETE TASK
# =========================
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = get_task_or_404(db, task_id)

    db.delete(db_task)
    db.commit()

    clear_tasks_cache()

    return {"message": "Task deleted successfully"}

BASE_DIR = Path(__file__).resolve().parent


@app.get("/")
def serve_react():
    return FileResponse(BASE_DIR / "static" / "index.html")


@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    return FileResponse(BASE_DIR / "static" / "index.html")