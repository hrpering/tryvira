FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.lock ./
RUN pip install --no-cache-dir --require-hashes --requirement requirements.lock
COPY graph.py ./
USER 10001:10001
CMD ["python", "graph.py"]
