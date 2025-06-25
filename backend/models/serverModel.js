const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId,ref:"User" },
  imageUrl: { type: String },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: { type: String },
});

module.exports = mongoose.model("Server", serverSchema);