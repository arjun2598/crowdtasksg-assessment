const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const { authenticateToken } = require("./authentication");

const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

client.connect().catch((err) => {
  console.error("Error connecting to PostgreSQL database", err);
});

// Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  try {
    const query = "SELECT * FROM users WHERE username = $1"; // Query database using entered username
    const result = await client.query(query, [username]);

    if (result.rows.length === 0) { // No matching user
      return res.status(404).json({ message: "Username not found." });
    }

    const user = result.rows[0];
      
    const storedPasswordHash = user.password_hash;
    const match = await bcrypt.compare(password, storedPasswordHash); // Check for password match

    if (!match) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign( // Generate jwt token
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
      
    return res.json({
      message: "Login successful.",
      user: { username: user.username, password: user.password_hash },
      token,
    });
      
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

// API to fetch user information
app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const { username } = req.user;
      
    const query = `
            SELECT first_name, last_name, date_of_birth, address, gender, nric
            FROM users
            WHERE username = $1`; 

    const result = await client.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = result.rows[0];
    res.json({
      message: "User information retrieved successfully.",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

app.listen(8000);
module.exports = app;
