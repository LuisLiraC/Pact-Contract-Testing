import subprocess
import os
from read_env import read_env_file


def restore_db(container, db_name, user, file):
    command = f"docker exec -i {container} psql -U {user} -d {db_name} < {file}"
    subprocess.run(command, shell=True)


if __name__ == "__main__":
    env_vars = read_env_file()
    os.environ.update(env_vars)
    container_name = "db"
    database_name = os.getenv("POSTGRES_DB")
    input_file = "../backup.sql"
    postgres_user = os.getenv("POSTGRES_USER")

    restore_db(container_name, database_name, postgres_user, input_file)
