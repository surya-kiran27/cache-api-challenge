const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CacheEntrySchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    expiresAt: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CacheEntry", CacheEntrySchema);
