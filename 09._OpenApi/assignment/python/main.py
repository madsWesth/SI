from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class RequestBeer(BaseModel):
    name: str
    brand: str


class ResponseBeer(BaseModel):
    id: int
    name: str
    brand: str


beers: list[ResponseBeer] = [
    ResponseBeer(id=1, name="øl1", brand="Mikkeller"),
    ResponseBeer(id=2, name="øl2", brand="To Øl"),
    ResponseBeer(id=3, name="øl3", brand="Carlsberg"),
    ResponseBeer(id=4, name="øl4", brand="Heineken"),
    ResponseBeer(id=5, name="øl5", brand="Skovlyst"),
    ResponseBeer(id=6, name="øl6", brand="Guiness"),
    ResponseBeer(id=7, name="øl7", brand="Tuborg"),
    ResponseBeer(id=8, name="øl8", brand="Nørrebro Bryghus"),
    ResponseBeer(id=9, name="øl9", brand="Brew Dog"),
]


@app.get("/")
def _index():
    return "welcome"


@app.get("/beers", tags=["Beers"], response_model=list[ResponseBeer])
def getBeers():
    return beers


@app.get("/beers/{beer_id}", tags=["Beers"])
def getBeer(beer_id):
    for beer in beers:
        if int(beer.id) == int(beer_id):
            return beer


@app.post("/beers", tags=["Beers"], response_model=ResponseBeer)
def createBeer(reqBeer: RequestBeer):
    highestId = -1

    for beer in beers:
        if int(beer.id) > highestId:
            highestId = int(beer.id)

    newBeer = ResponseBeer(
        id=int(highestId + 1), name=reqBeer.name, brand=reqBeer.brand)
    beers.append(newBeer)

    return newBeer


@app.put("/beers/{beer_id}", tags=["Beers"], response_model=ResponseBeer)
def replaceBeer(reqBeer: RequestBeer, beer_id: int):
    index: int | None = None

    for beer in beers:
        if int(beer.id) == int(beer_id):
            index = beers.index(beer)

    if index is not None:
        newBeer = ResponseBeer(
            id=int(beer_id), name=str(reqBeer.name), brand=str(reqBeer.brand))
        beers[index] = newBeer
        return newBeer
    else:
        raise HTTPException(status_code=404)


@app.delete("/beers/{beer_id}", tags=["Beers"], status_code=200)
def deleteBeer(beer_id: int):
    index: int | None = None

    for beer in beers:
        if int(beer.id) == int(beer_id):
            index = beers.index(beer)

    if index is not None:
        beers.pop(index)
        return
    else:
        raise HTTPException(status_code=404)
