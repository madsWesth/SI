from fastapi import FastAPI

app = FastAPI()

from routers import spacecraft_router, users_router

app.include_router(spacecraft_router)
app.include_router(users_router)

