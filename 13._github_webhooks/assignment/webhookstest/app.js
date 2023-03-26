import express from "express";

const app = express();
app.use(express.json());

//receives data from the webhook and prints them
app.post("/listenProfileCreation", (req, res) => {
  console.log(req.body);

  res.status(204).send();
});

app.post("/listenProfileDeletion", (req, res) => {
  console.log(req.body);

  res.status(204).send();
});

//register to the webhooks
app.get("/subProfileCreation", (req, res) => {
  fetch("http://localhost:8080/webhook/subscribe-profile-creation", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "http://localhost:8081/listenProfileCreation",
      // url: "https://webhook.site/35e927f2-381c-4037-8c12-82d9bb271482",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`subscribed to profileCreation subToken: ${data.subToken}`);
    });

  res.status(204).send();
});

app.get("/subProfileDeletion", (req, res) => {
  fetch("http://localhost:8080/webhook/subscribe-profile-deletion", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "http://localhost:8081/listenProfileDeletion",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`subscribed to profileDeletion subToken: ${data.subToken}`);
    });

  res.status(204).send();
});

//unregisters to the webhooks
app.delete("/unsubProfileCreation/:subToken", (req, res) => {
  fetch(
    `http://localhost:8080/webhook/unsubscribe-profile-creation/${req.params.subToken}`,
    {
      method: "delete",
    }
  ).then(() => console.log("unsubscribed from profileCreation"));

  res.status(204).send();
});

app.delete("/unsubProfileDeletion/:subToken", (req, res) => {
  fetch(
    `http://localhost:8080/webhook/unsubscribe-profile-deletion/${req.params.subToken}`,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(() => console.log("unsubscribed from profileDeletion"));

  res.status(204).send();
});

const PORT = 8081;
app.listen(PORT, () => console.log("webhook server running on port: ", PORT));
