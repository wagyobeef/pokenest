const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const axios = require("axios");

// Create a new collection for a user
router.post("/", ClerkExpressRequireAuth(), async (req, res) => {
  const isDebugMode = process.env.DEBUG_MODE ?? false;
  if (isDebugMode) {
    console.log("Status: creating new collection");
    console.log("User ID:", req.auth.userId);
  }

  try {
    const { name, cardIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Collection name is required" });
    }

    const collection = new Collection({
      userId: req.auth.userId,
      name: name,
      cardIds: cardIds || [],
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

    const collections = await Collection.find({ userId }).lean();

    const previewsMap = {}; // { cardId: collectionId }
    const previewIdsMap = {}; // { collectionId: [cardId1, cardId2, ...] }
    const allPreviewIds = new Set();

    for (const collection of collections) {
      const cardIds = collection.cardIds || [];
      const randomCardIds = [...cardIds]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      previewIdsMap[collection._id] = randomCardIds;
      for (const id of randomCardIds) {
        allPreviewIds.add(id);
        previewsMap[id] = collection._id;
      }
    }

    const apiKey = process.env.TCG_API_KEY;

    let previewCardResults = [];
    if (allPreviewIds.size > 0) {
      const queryString = Array.from(allPreviewIds)
        .map((id) => `id:${id}`)
        .join(" OR ");

      if (isDebugMode) {
        console.log("Fetching preview cards with query:", queryString);
      }

      const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
        headers: { "X-Api-Key": apiKey },
        params: { q: queryString },
      });

      previewCardResults = response.data?.data || [];
    }

    // Group cards by collection ID
    const collectionCardMap = {};
    for (const card of previewCardResults) {
      const collectionId = previewsMap[card.id];
      if (!collectionCardMap[collectionId]) {
        collectionCardMap[collectionId] = [];
      }
      collectionCardMap[collectionId].push(card);
    }

    // Merge back into original collections
    const enrichedCollections = collections.map((collection) => ({
      ...collection,
      previewCards: collectionCardMap[collection._id] || [],
    }));

    res.json(enrichedCollections);
  } catch (error) {
    console.error("Error fetching optimized previews:", error);
    res.status(500).json({ message: "Error fetching collections" });
  }
});

module.exports = router;
