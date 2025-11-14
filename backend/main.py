import uvicorn
import os
from types import SimpleNamespace
from dotenv import load_dotenv
from pathlib import Path
from multiprocessing import Process

load_dotenv()

backend = SimpleNamespace(
    host="0.0.0.0",
    port=8081
)
frontend = SimpleNamespace(
    host="0.0.0.0",
    port=int(os.getenv("WEB_PORT", 8080)),
)

os.environ["BACKEND_HOST_INTERNAL"] = backend.host
os.environ["BACKEND_PORT_INTERNAL"] = str(backend.port)

static_dir=Path(os.getenv("FRONTEND_PATH", "frontend/dist"))
env = os.getenv("ENV", "production").lower()
reload = env in ("dev", "development")

def run_backend():
    uvicorn.run("app.api_server:app", **vars(backend), reload=reload)

def run_frontend():
    uvicorn.run("app.frontend_server:app", **vars(frontend), reload=reload)

if __name__ == "__main__":
    #* Always start backend, our api server
    p_backend = Process(target=run_backend)
    p_backend.start()

    #* Only run frontend if it exists in the requested path
    p_frontend = None
    if static_dir.exists():
        p_frontend = Process(target=run_frontend)
        p_frontend.start()
    else:
        print(f"Frontend not found at {static_dir}; not starting frontend server.")

    #* Start processes
    try:
        p_backend.join()
        if p_frontend:
            p_frontend.join()
    except KeyboardInterrupt:
        for p in (p_backend, p_frontend):
            if p and p.is_alive():
                p.terminate()
