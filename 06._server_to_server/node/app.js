import express from "express"

const app = express();
const PORT = 8080;

app.get("/date", (req, res) => {
    res.send(new Date());
});

app.get("/datefromfastapi", async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/date")
    const data = await response.json();
    res.send({data});
});


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
