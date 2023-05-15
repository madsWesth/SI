import fs from "fs";

// const response = await fetch("https://www.proshop.dk/baerbar-computer");
// const result = await response.text();

// fs.writeFileSync("index.html", result);

import { load } from "cheerio";

const page = fs.readFileSync("index.html", "utf-8");
const $ = load(page);

$("#products [product]").each((element) => {
    const name = $(element).find(".site-product-link h2").text();

    const price = $(element).find(".site-currency-lg").text();

    const item = `${price} ${name}`;

    console.log(item);
})