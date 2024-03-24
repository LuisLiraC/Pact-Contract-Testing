FROM python:3.9

WORKDIR /app
RUN apt-get update && apt-get install -y wait-for-it && apt-get clean

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
