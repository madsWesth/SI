import db from "./database/connection.js";

db.exec(`CREATE TABLE IF NOT EXISTS movies (title, year, score)`)

db.run(`INSERT INTO movies VALUES (?, ?, ?), (?, ?, ?)`, ["The Matrix", 1999, 9.3, "The Matrix Reloaded", 2003, 7.3])

const movies = await db.all(`SELECT * FROM movies`)
console.log(movies)