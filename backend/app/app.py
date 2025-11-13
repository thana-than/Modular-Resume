from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from pathlib import Path
from app.db import Database
from types import SimpleNamespace
import os
import asyncio
import logging

web = SimpleNamespace(
    host=os.getenv("WEB_HOST", "0.0.0.0"),
    port=int(os.getenv("WEB_PORT", 8080))
)
db = Database()
logger = logging.getLogger("uvicorn")

@asynccontextmanager
async def lifespan(_app: FastAPI):
    db.start()
    yield
    db.close()

app = FastAPI(lifespan=lifespan)
app_api = FastAPI(root_path="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app_api.post("/populate", tags=["populate"])
async def populate(request: dict) -> dict:
    """Populate endpoint: runs the DB's populate_content in a thread and returns the resulting structure."""
    result = await asyncio.to_thread(db.populate_content, request)
    return result

@app_api.post("/get", tags=["get"])
async def get(request : dict) -> dict:
    """Get endpoint: gets items from the database based on the request type."""
    result = []
    #* process keys in order so they appear ordered in the json
    for key in request:
        if key == 'ids':
            ids = await asyncio.to_thread(db.get_by_ids, request['ids'])
            result.append(ids)
        if key == 'category':
            categories = await asyncio.to_thread(db.get_by_category, request['category'])
            result.append(categories)

    return {'response':result}

# Mount here so calls can be forwarded to the api subapp
app.mount("/api", app_api)

# Mount static (frontend) directories if they exist
static_dir = Path(os.getenv("FRONTEND_PATH", "frontend/dist"))
if static_dir.exists():
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="frontend")
    logger.info(f'Serving frontend in {str(static_dir)} at {web.host}:{web.port}')