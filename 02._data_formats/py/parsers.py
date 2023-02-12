from pathlib import Path
import csv
import json
import xmltodict
import yaml


def parseCSV(path):
    with open(path) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            print(row)


def parseJSON(path):
    with open(path) as jsonfile:
        reader = json.load(jsonfile)
        for row in reader:
            print(row)


def parseXML(path):
    with open(path) as xmlfile:
        data = xmltodict.parse(xmlfile.read())
        print(data)


def parseYAML(path):
    with open(path) as yamlfile:
        data = yaml.safe_load(yamlfile)
        print(data)


def parseTXT(path):
    dict = {}
    with open(path) as txtfile:
        for line in txtfile:
            parseLine(line, dict)

    print(dict)


def parseLine(line: str, dict):
    key, tag, value = line.split()
    match tag:
        case "@string":
            dict[key] = value
        case "@number":
            dict[key] = int(value)
        case "@array":
            dict[key] = value.split(",")
