// db models
const CacheEntry = require('../models/CacheEntry');

async function getAllEntries() {
  try {
    const allEntries = await CacheEntry.find({}, {}, { lean: true });
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

async function updateEntryByKey(key, updateObj) {
  try {
    return await CacheEntry.findOneAndUpdate({ key }, { $set: { ...updateObj } }, { new: true });
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


module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntryByKey,
  deleteEntryById,
  getEntriesCount
};
