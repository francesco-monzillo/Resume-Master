FROM python:3.13.13-slim-trixie AS builder

COPY requirements.txt requirements.txt

RUN pip wheel --no-cache-dir --wheel-dir ./wheels -r requirements.txt

FROM python:3.13.13-slim-trixie AS runner

RUN apt update && apt install -y libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz-subset0

COPY --from=builder /wheels /wheels

RUN pip install --no-cache ./wheels/* && rm -rf /wheels

COPY /API /API

COPY /src /src

EXPOSE 8000

CMD ["uvicorn", "API.main:api", "--host", "0.0.0.0", "--port", "8000"]