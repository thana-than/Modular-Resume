from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db import Database
import asyncio
import logging

db = Database()
logger = logging.getLogger("uvicorn")

@asynccontextmanager
async def lifespan(_app: FastAPI):
    db.start()
    yield
    db.close()

app = FastAPI(lifespan=lifespan, root_path="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/populate", tags=["populate"])
async def populate(request: dict) -> dict:
    """Populate endpoint: runs the DB's populate_content in a thread and returns the resulting structure."""
    result = await asyncio.to_thread(db.populate_content, request)
    return result

@app.post("/get", tags=["get"])
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