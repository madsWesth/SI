import express from "express";
import {
  parseCSV,
  parseJSON,
  parseTXT,
  parseXML,
  parseYAML,
} from "./parsers.js";

const app = express();

const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));

const baseFilePath = "../data/data";

app.get("/csv", async (req, res) => {
  res.send({ data: await parseCSV(`${baseFilePath}.csv`) });
});

app.get("/json", async (req, res) => {
  res.send({ data: await parseJSON(`${baseFilePath}.json`) });
});

app.get("/xml", async (req, res) => {
  res.send({ data: await parseXML(`${baseFilePath}.xml`) });
});

app.get("/yaml", async (req, res) => {
  res.send({ data: await parseYAML(`${baseFilePath}.yaml`) });
});

app.get("/txt", async (req, res) => {
  res.send({ data: await parseTXT(`${baseFilePath}.txt`) });
});
