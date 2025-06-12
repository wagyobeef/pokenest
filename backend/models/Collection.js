const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  userId: {
    type: String, // Clerk userId
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cardIds: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
