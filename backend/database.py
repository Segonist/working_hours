from sqlmodel import create_engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

import models

load_dotenv()

DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')

DATABASE = 'mysql://%s:%s@%s/' % (
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
)

engine = create_engine(f"{DATABASE}{DB_NAME}", echo=True)


def create_database_if_not_exists():
    engine = create_engine(DATABASE, echo=True)

    # create the database if it doesn't exist
    with engine.connect() as conn:
        conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}"))
        conn.commit()


def create_db_and_tables():
    # get all models that extend SQLModel and create them
    models.SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_database_if_not_exists()
    create_db_and_tables()
