import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/file-upload", (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server running on port ", PORT));
