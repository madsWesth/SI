// this script requires node version that supports import assertions
import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import { parse as YAMLparse } from "yaml";

// --csv --json --xml --yaml --txt
if (process.argv.length === 2) {
  console.error("Expected a file type argument!");
  process.exit(1);
}
const fileType = process.argv[2].slice(2);
const filePath = `../data/data.${fileType}`;

switch (fileType) {
  case "csv":
    parseCSV(filePath);
    break;
  case "json":
    parseJSON(filePath);
    break;
  case "xml":
    parseXML(filePath);
    break;
  case "yaml":
    parseYAML(filePath);
    break;
  case "txt":
    parseTXT(filePath);
    break;
  default:
    console.error("Unknown file type: " + fileType);
    process.exit(1);
}

async function parseCSV(path) {
  const data = await fs.readFile(path, "utf-8");
  const parsedData = parse(data, {
    delimiter: ",",
    columns: true,
  });
  console.log(parsedData);
}

async function parseJSON(path) {
  const data = await import(path, { assert: { type: "json" } });
  console.log(data);
}

async function parseXML(path) {
  const data = await fs.readFile(path, "utf-8");
  const parser = new XMLParser();
  const parsedData = parser.parse(data);
  console.log(parsedData, "\nconsole.log doesnt show deeply nested data");
}

async function parseYAML(path) {
  const data = await fs.readFile(path, "utf-8");
  const parsedData = YAMLparse(data);
  console.log(parsedData);
}

async function parseTXT(path) {
  const data = await fs.readFile(path, "utf-8");
  const obj = {};
  const lines = data.split("\r\n");
  lines.forEach((line) => {
    const lineArray = line.split(" ");
    switch (lineArray[1]) {
      case "@string":
        obj[lineArray[0]] = lineArray[2];
        break;
      case "@number":
        obj[lineArray[0]] = Number(lineArray[2]);
        break;
      case "@array":
        obj[lineArray[0]] = lineArray[2].split(",");
        break;
    }
  });
  console.log(obj);
}
