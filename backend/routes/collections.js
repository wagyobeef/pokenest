const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

// Create a new collection for a user
router.post("/", ClerkExpressRequireAuth(), async (req, res) => {
  const isDebugMode = process.env.DEBUG_MODE ?? false;
  if (isDebugMode) {
    console.log("Status: creating new collection");
    console.log("User ID:", req.auth.userId);
  }

  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Collection name is required" });
    }

    const collection = new Collection({
      userId: req.auth.userId,
      name: name,
    });

    const savedCollection = await collection.save();

    if (isDebugMode) {
      console.log("Created collection:", savedCollection);
    }

    res.status(201).json(savedCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ message: "Error creating collection" });
  }
});

// Get all collections for a user
router.get("/", ClerkExpressRequireAuth(), async (req, res) => {
  const isDebugMode = process.env.DEBUG_MODE ?? false;
  try {
    const userId = req.auth.userId;
    if (isDebugMode) {
      console.log("Fetching collections for user:", userId);
    }
    const collections = await Collection.find({ userId });
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Error fetching collections" });
  }
});

module.exports = router;
