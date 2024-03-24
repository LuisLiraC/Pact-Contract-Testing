import subprocess
import os
from read_env import read_env_file


def backup_db():
    env_vars = read_env_file()
    os.environ.update(env_vars)
    container_name = "db"
    database_name = os.getenv("POSTGRES_DB")
    output_file = "../backup.sql"
    user = os.getenv("POSTGRES_USER")

    command = f"docker exec {container_name} pg_dump -U {user} -d {database_name}"
    with open(output_file, "w") as f:
        subprocess.run(command, shell=True, stdout=f)


if __name__ == "__main__":
    backup_db()
