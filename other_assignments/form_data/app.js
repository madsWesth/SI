import express from "express";
import multer from "multer";

const upload = multer({ dest: "./uploads" });

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/file-upload", upload.array("files", 5), (req, res) => {
  console.log("givenName: ", req.body.givenName);
  console.log("files: ", req.files);

  res.sendStatus(200);
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server running on port ", PORT));
