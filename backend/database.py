from sqlmodel import create_engine

import models

engine = create_engine("sqlite:///working_hours.db", echo=True)


def create_db_and_tables():
    models.SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    create_db_and_tables()
