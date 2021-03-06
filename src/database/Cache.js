/* eslint-disable no-useless-catch */
// db models
const CacheEntry = require('../models/CacheEntry');

async function getAllEntries() {
  try {
    const allEntries = await CacheEntry.find(
      { expiresAt: { $gt: new Date() } },
      {},
      { lean: true }
    );
    return allEntries;
  } catch (error) {
    throw error;
  }
}

async function getEntry(key) {
  try {
    const entry = await CacheEntry.findOne({ key });
    return entry;
  } catch (error) {
    throw error;
  }
}

async function createEntry(entry) {
  try {
    const cacheEntry = new CacheEntry(entry);
    return cacheEntry.save();
  } catch (error) {
    throw error;
  }
}

async function updateEntryByKey(key, updateObj, optionsObj) {
  try {
    return await CacheEntry.findOneAndUpdate({ key }, { $set: { ...updateObj } }, optionsObj);
  } catch (error) {
    throw error;
  }
}

async function deleteEntryById(id) {
  try {
    return CacheEntry.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}

async function getEntriesCount() {
  try {
    return CacheEntry.countDocuments();
  } catch (error) {
    throw error;
  }
}

async function deleteOldestEntry() {
  try {
    return CacheEntry.findOneAndDelete({}, { sort: { createdAt: 1 } });
  } catch (error) {
    throw error;
  }
}

async function deleteAllEntries() {
  try {
    return CacheEntry.deleteMany({});
  } catch (error) {
    throw error;
  }
}

async function deleteEntryByKey(key) {
  try {
    return CacheEntry.findOneAndDelete({ key });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntryByKey,
  deleteEntryById,
  getEntriesCount,
  deleteOldestEntry,
  deleteAllEntries,
  deleteEntryByKey
};
