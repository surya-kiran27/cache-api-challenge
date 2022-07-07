/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');

const getExpiresAt = require('../utils/getExpiresAt');

const { Schema } = mongoose;

const CacheEntrySchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    expiresAt: { type: Number, default: getExpiresAt },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CacheEntry', CacheEntrySchema);
