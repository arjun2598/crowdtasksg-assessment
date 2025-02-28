const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Client } = require("pg");
    
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password required" });
    }

    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND password_hash = $2';
        const result = await client.query(query, [username, password])

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(8000);
module.exports = app;