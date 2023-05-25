import { load } from "cheerio";

import fs from "fs";
const BASE_URL = "https://news.ycombinator.com/";
// downloaded page as to not keep requesting from the server
// const response = await fetch("https://news.ycombinator.com")
// const result = await response.text();
// fs.writeFileSync("index.html", result)

// https://news.ycombinator.com/robots.txt
// CONTENTS:
// User-Agent: *
// Disallow: /x?
// Disallow: /r?
// Disallow: /vote?
// Disallow: /reply?
// Disallow: /submitted?
// Disallow: /submitlink?
// Disallow: /threads?
// Crawl-delay: 30

// TODO: specfies a crawl-delay so there should be a delay of
// 30 seconds between each visit
const page = fs.readFileSync("index.html");
const $ = load(page);

// there are not very many selectors on the site so the selector string is a bit ugly
const threadRowsSelectorString =
  "table#hnmain > tbody > tr:nth(2) > td > table > tbody > tr";

const $threadRows = $(threadRowsSelectorString).slice(0, -2);

const $titles = $threadRows.filter((i, element) => {
  const isTitleElement = element.attribs.class === "athing";
  return isTitleElement;
});

const $comments = $threadRows.filter((i, element) => {
  const isCommentsElement = !element.attribs.class;
  return isCommentsElement;
});

const scrapedData = [];

$titles.each((i, element) => {
  const rankRaw = $(element).find(".rank").text();
  const rank = Number.parseInt(rankRaw.replace(".", ""));
  const title = $(element).find(".titleline > a").text();
  const link = $(element).find(".titleline > a").attr().href;

  scrapedData[i] = { rank, title, link };
});

$comments.each((i, element) => {
  const score = $(element).find(".score").text().split(" ")[0];
  const poster = $(element).find(".hnuser").text();
  const timestamp = $(element).find(".age").attr().title;
  const commentAmountRaw = $(element)
    .find(".subline > a:contains(comment)")
    .text();

  // splitting on whitespace doesnt work because it the page uses &nbsp, the
  // char xa0 is the Non-breakable space which &nbsp turns into after it is decoded
  const commentAmount = commentAmountRaw
    ? Number.parseInt(commentAmountRaw.split("\xa0")[0])
    : 0;

  let commentsUrl = $(element)
    .find(".subline > a:contains(comment)")
    .attr("href");

  const hasComments = Boolean(commentsUrl);
  commentsUrl = hasComments
    ? commentsUrl
    : $(element).find(".subline > a:contains(discuss)").attr("href");

  scrapedData[i] = {
    ...scrapedData[i],
    score,
    poster,
    timestamp,
    commentAmount,
    commentsUrl,
  };
});

console.log(scrapedData);

console.log(
  "if you wanted to scrape the comments for a thread you would fetch page with BASE_URL + commentsUrl"
);
console.log(
  `Here is the comments for the current top post as an example: ${
    BASE_URL + scrapedData[0].commentsUrl
  }`
);
