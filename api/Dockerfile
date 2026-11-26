# Builds the site and runs the API, which serves both. Build from the repository root:
#   docker build -f api/Dockerfile -t charleshope-cowork .
FROM node:22-slim AS web
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.js .env ./
COPY scripts ./scripts
COPY public ./public
COPY src ./src
RUN npm run build

FROM python:3.13-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 ENVIRONMENT=production TRUST_PROXY=true
COPY api/requirements.txt api/requirements.txt
RUN pip install --no-cache-dir -r api/requirements.txt
COPY api/app api/app
COPY --from=web /app/dist dist
ENV STATIC_DIR=/app/dist
EXPOSE 8000
CMD ["sh", "-c", "uvicorn api.app.main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers --forwarded-allow-ips='*'"]
