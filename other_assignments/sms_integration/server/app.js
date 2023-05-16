import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;

  if (user_email && user_password) {
    const loginFormData = new FormData();

    loginFormData.append("user_email", user_email);
    loginFormData.append("user_password", user_password);

    const response = await fetch("https://fiotext.com/login", {
      method: "POST",
      body: loginFormData,
    });

    const result = await response.json();

    if (response.ok) {
      if (result.user_api_key) res.send({ user_api_key: result.user_api_key });
    } else res.status(400).send({ info: result.info });
  } else {
    res.status(400).send({ info: "missing credentials" });
  }
});

app.post("/send-sms", async (req, res) => {
  const { user_api_key, sms_message, sms_to_phone } = req.body;

  if (user_api_key && sms_message && sms_to_phone) {
    const msgFormData = new FormData();

    msgFormData.append("user_api_key", user_api_key);
    msgFormData.append("sms_message", sms_message);
    msgFormData.append("sms_to_phone", sms_to_phone);

    const response = await fetch("https://fiotext.com/send-sms", {
      method: "POST",
      body: msgFormData,
    });

    const result = await response.json();

    if (response.ok) {
      res.sendStatus(200);
    } else res.status(400).send({ info: result.info });
  } else res.status(400).send({ info: "missing info" });
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server is running on port", PORT));
