from fastapi import FastAPI
from parsers.parsers import parseCSV, parseJSON, parseTXT, parseXML, parseYAML

app = FastAPI()


@app.get("/")
def _():
    return "hello world"


@app.get("/csv")
def _():
    path = '../data/data.csv'
    return parseCSV(path)


@app.get("/json")
def _():
    path = '../data/data.json'
    return parseJSON(path)


@app.get("/txt")
def _():
    path = '../data/data.txt'
    return parseTXT(path)


@app.get("/xml")
def _():
    path = '../data/data.xml'
    return parseXML(path)


@app.get("/yaml")
def _():
    path = '../data/data.yaml'
    return parseYAML(path)
