import crypto from "crypto";
import express from "express";
import { User } from "./types";

const app = express();

app.use(express.static("public"));
app.use(express.json());

let users: User[] = []

app.get("/subscribeChat", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  })

  const randId = crypto.randomBytes(32).toString("hex")
  const newUser: User = {
    id: randId,
    response : res
  }

  users.push(newUser)

  req.on("close", () => {
    users = users.filter(user => user.id !== randId)
  })
});

app.post("/msg", (req, res) => {
  const msg = req.body.chatMsg as string;
  console.log("Users connected: ", users.length)

  if (msg) {
    users.forEach(user => {
      user.response.write(`data: ${msg}\n\n`)
    })
  }

  res.send()
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
