import express from 'express';
import cors from 'cors';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get("/timestamp", (req, res) => {
    res.send(new Date());
})


app.listen(8080, () => console.log("Server is listening on port 8080"))