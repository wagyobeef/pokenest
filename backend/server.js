// server.js
const express = require("express");
const app = express();
const PORT = 3000; // or any port you prefer

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
