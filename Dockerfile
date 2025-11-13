# Build Frontend
FROM node:22-alpine AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build Backend
FROM python:3.11-slim AS backend
WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

COPY --from=frontend /frontend/dist /static

ENV DB_NAME=postgres
ENV DB_USER=postgres
ENV DB_PASS=''
ENV DB_HOST=localhost
ENV DB_PORT=5432

ENV FRONTEND_PATH='/static'

EXPOSE 8080
CMD ["python", "main.py"]