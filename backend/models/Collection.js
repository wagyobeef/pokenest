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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
