import fs from "fs/promises";
import { parse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import { parse as YAMLparse } from "yaml";

export async function parseCSV(path) {
  const data = await fs.readFile(path, "utf-8");
  const parsedData = parse(data, {
    delimiter: ",",
    columns: true,
  });
  return parsedData;
}

export async function parseJSON(path) {
  return await import(path, { assert: { type: "json" } });
}

export async function parseXML(path) {
  const data = await fs.readFile(path, "utf-8");
  const parser = new XMLParser();
  const parsedData = parser.parse(data);
  return parsedData;
}

export async function parseYAML(path) {
  const data = await fs.readFile(path, "utf-8");
  const parsedData = YAMLparse(data);
  return parsedData;
}

export async function parseTXT(path) {
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
  return obj;
}
