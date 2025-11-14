from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os
import logging
import httpx

logger = logging.getLogger("uvicorn")

app = FastAPI()

BACKEND_HOST = os.getenv("BACKEND_HOST_INTERNAL","0.0.0.0")
BACKEND_PORT = os.getenv("BACKEND_PORT_INTERNAL","8081")

# Mount static (frontend) directories if they exist
static_dir = Path(os.getenv("FRONTEND_PATH", "frontend/dist"))
if static_dir.exists():
    @app.api_route("/api/{path:path}", methods=["GET", "POST", "OPTIONS"])
    async def proxy(path: str, request: Request):
        url = f"{BACKEND_HOST}:{BACKEND_PORT}/{path}"
        url = url if url.startswith("http") else f"http://{url}"
        async with httpx.AsyncClient() as client:
            response = await client.request(
                request.method,
                url,
                content=await request.body(),
                headers=request.headers.raw,
            )
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=response.headers
        )

    app.mount("/", StaticFiles(directory=static_dir, html=True), name="frontend")
    logger.info(f'Serving frontend in {str(static_dir)}')