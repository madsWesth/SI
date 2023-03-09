import csv
import json
import xmltodict
import yaml


def parseCSV(path):
    with open(path) as csvfile:
        reader = csv.DictReader(csvfile)
        rows = []
        for row in reader:
            rows.append(row)
        return rows


def parseJSON(path):
    with open(path) as jsonfile:
        reader = json.load(jsonfile)
        rows = []
        for row in reader:
            rows.append(row)
        return rows


def parseXML(path):
    with open(path) as xmlfile:
        data = xmltodict.parse(xmlfile.read())
        return data


def parseYAML(path):
    with open(path) as yamlfile:
        data = yaml.safe_load(yamlfile)
        return data


def parseTXT(path):
    dict = {}
    with open(path) as txtfile:
        for line in txtfile:
            parseLine(line, dict)

    return dict


def parseLine(line: str, dict):
    key, tag, value = line.split()
    match tag:
        case "@string":
            dict[key] = value
        case "@number":
            dict[key] = int(value)
        case "@array":
            dict[key] = value.split(",")
