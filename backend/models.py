from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    Integer,
    String,
)
from sqlalchemy.sql import expression, func

from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False)
    completed = Column(
        Boolean,
        default=False,
        server_default=expression.false(),
        nullable=False,
    )
    created_at = Column(
        DateTime,
        default=func.now(),
        server_default=func.now(),
        nullable=False,
        index=True,
    )

    __table_args__ = (
        CheckConstraint(
            "length(trim(title)) >= 2",
            name="title_min_length",
        ),
        CheckConstraint(
            "length(trim(description)) >= 2",
            name="description_min_length",
        ),
    )