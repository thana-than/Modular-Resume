import uvicorn
import os
from types import SimpleNamespace
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    backend = SimpleNamespace(
        host=os.getenv("WEB_HOST", "0.0.0.0"),
        port=int(os.getenv("WEB_PORT", 8080))
    )
    env = os.getenv("ENV", "production").lower()
    reload = env in ("dev", "development")
    uvicorn.run("app.api:app", **vars(backend), reload=reload)