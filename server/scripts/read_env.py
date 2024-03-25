import os


def read_env_file():
    env_vars = {}
    dotenv_path = os.path.join(os.path.dirname(__file__), "../.env")
    with open(dotenv_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                env_vars[key.strip()] = value.strip()
    return env_vars
