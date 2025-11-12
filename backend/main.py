import uvicorn
import os
from types import SimpleNamespace
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    backend = SimpleNamespace(
        host=os.getenv("BACKEND_HOST", "localhost"),
        port=int(os.getenv("BACKEND_PORT", 8000))
    )
    uvicorn.run("app.api:app", **vars(backend), reload=True)