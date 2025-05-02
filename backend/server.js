// server.js
require("dotenv").config();
console.log("DEBUG_MODE from .env:", process.env.DEBUG_MODE);
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Protected route that requires authentication
app.get("/search-cards", ClerkExpressRequireAuth(), async (req, res) => {
  const isDebugMode = process.env.DEBUG_MODE ?? false;
  if (isDebugMode) {
    console.log("Status: in search cards");
    console.log("User ID:", req.auth.userId);
  }
  const q = req.query.q;
  if (isDebugMode) {
    console.log(`q: ${q}`);
  }
  if (q == "") {
    return res.status(400).json({ message: "Please provide a Pokemon name." });
  }

  try {
    const apiKey = process.env.TCG_API_KEY;
    const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
      headers: {
        "X-Api-Key": apiKey,
      },
      params: {
        q,
        page: 1,
        pageSize: 25,
      },
    });

    if (isDebugMode) {
      console.log("Response: ", response.data);
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cards from the API." });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
const apiURL = process.env.API_URL || "0.0.0.0";
app.listen(PORT, apiURL, () => {
  console.log(`Server is running on ${apiURL}:${PORT}`);
});
