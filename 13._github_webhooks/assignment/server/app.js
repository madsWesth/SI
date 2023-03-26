import express from "express";
import crypto from "crypto";
import { sendToSubscribers } from "./utils/utils.js";
import { subscribers, router } from "./routers/webhooksRouter.js";

const app = express();

app.use(express.json());

app.use(router);

let profiles = [
  {
    id: crypto.randomBytes(16).toString("hex"),
    username: "user1",
    dob: new Date("01-01-2001"),
  },
  {
    id: crypto.randomBytes(16).toString("hex"),
    username: "user2",
    dob: new Date("02-02-2002"),
  },
];

app.get("/profiles", (req, res) => {
  res.send(profiles);
});

app.get("/profiles/:id", (req, res) => {
  const profile = profiles.find((profile) => profile.id === req.params.id);
  res.send(profile);
});

app.post("/profiles", (req, res) => {
  const profile = {
    id: crypto.randomBytes(16).toString("hex"),
    ...req.body,
  };

  profiles.push(profile);

  if (subscribers.length > 0) {
    sendToSubscribers(subscribers, "profileCreation", profile.id);
  }

  res.status(200).send();
});

app.delete("/profiles/:id", (req, res) => {
  profiles = profiles.filter((profile) => profile.id !== req.params.id);

  if (subscribers.length > 0) {
    sendToSubscribers(subscribers, "profileDeletion", req.params.id);
  }
  res.status(204).send();
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
