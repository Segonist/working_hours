from sqlmodel import create_engine
from dotenv import load_dotenv
import os

import models

DATABASE_ADRESS = os.getenv("DATABASE_ADRESS")


engine = create_engine(DATABASE_ADRESS, echo=True)


def create_db_and_tables():
    # get all models that extend SQLModel and create them
    models.SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables()
