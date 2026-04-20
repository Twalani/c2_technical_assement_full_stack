from pydantic import BaseModel, validator
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: str

    @validator("title", "description")
    def validate_text(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Must be at least 2 characters")
        return v[0].upper() + v[1:]


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    completed: bool


class Task(BaseModel):
    id: int
    title: str
    description: str
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True