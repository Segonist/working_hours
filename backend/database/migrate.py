import sqlite3

connection = sqlite3.connect("working_hours.db")
cursor = connection.cursor()

migartions = [
    "DROP TABLE IF EXISTS shift",

    """CREATE TABLE shift (
    id INTEGER PRIMARY KEY,
    user_id INT NOT NULL,
    start_timestamp INT NOT NULL,
    end_timestamp INT DEFAULT NULL,
    state INT CHECK(state IN (0, 1)) DEFAULT 0 NOT NULL,
    wage FLOAT NOT NULL
)""",
]

for migration in migartions:
    cursor.execute(migration)
cursor.close()
