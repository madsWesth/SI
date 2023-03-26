import { Router } from "express";
import crypto from "crypto";

export const router = Router();

export let subscribers = [];

router.post("/webhook/subscribe-profile-creation", (req, res) => {
  const subToken = crypto.randomBytes(16).toString("hex");

  subscribers.push({
    subToken,
    url: req.body.url,
    eventType: "profileCreation",
  });

  console.log(
    `profileCreation sub with url: ${req.body.url} and subToken: ${subToken}`
  );

  res.status(200).send({ subToken });
});

router.post("/webhook/subscribe-profile-deletion", (req, res) => {
  const subToken = crypto.randomBytes(16).toString("hex");
  subscribers.push({
    subToken,
    url: req.body.url,
    eventType: "profileDeletion",
  });

  console.log(
    `profileDeletion sub with url: ${req.body.url} and subToken: ${subToken}`
  );

  res.status(200).send({ subtoken });
});

router.delete("/webhook/unsubscribe-profile-creation/:subToken", (req, res) => {
  subscribers = subscribers.filter(
    (sub) =>
      sub.subToken !== req.params.subToken &&
      sub.eventType !== "profileCreation"
  );

  console.log(
    `removed profileCreation subscription with subToken: ${req.params.subToken}`
  );

  res.status(204).send();
});

router.delete("/webhook/unsubscribe-profile-deletion/:subToken", (req, res) => {
  subscribers = subscribers.filter(
    (sub) =>
      sub.subToken !== req.params.subToken && sub.type !== "profileDeletion"
  );

  console.log(
    `removed profileDeletion subscription with subToken: ${req.params.subToken}`
  );

  res.status(204).send();
});
