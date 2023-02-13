from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "First FastAPI route"}

@app.get("/newroute")
def _():
    return { "message": "New route"}