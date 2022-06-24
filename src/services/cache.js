// external dependencies
const { v4: uuidv4 } = require('uuid');
// internal dependencies
const cacheDB = require('../database/Cache');
const checkIfEntryExpired = require('../utils/checkIfEntryExpired');
const getExpiresAt = require('../utils/getExpiresAt');

async function createEntry({ key, value }) {
  // check if cache is full
  const totalEntries = await cacheDB.getEntriesCount();
  if (totalEntries >= process.env.MAX_CACHE_ENTRIES) {
    console.log('Cache overflow');
    // cache overflow
    // delete oldest entry
    await cacheDB.deleteOldestEntry();
  }
  return cacheDB.createEntry({ key, value });
}

async function getAllEntries() {
  try {
    const entries = await cacheDB.getAllEntries();
    return entries;
  } catch (error) {
    throw error;
  }
}

async function getEntry(key) {
  const entry = await cacheDB.getEntry(key);
  if (entry) {
    console.log('Cache hit');
    // check if entry is expired
    if (checkIfEntryExpired(entry)) {
      console.info('Cache entry expired', entry.key);
      const randomString = uuidv4();
      try {
        await cacheDB.deleteEntryById(entry._id);
        // update cache and return entry
        await createEntry({ key, value: randomString });
      } catch (error) {
        throw error;
      }
    }
    // reset TTL on cache hit/read
    return cacheDB.updateEntryByKey(key, { expiresAt: getExpiresAt() }, { new: true });
  }
  console.log('Cache miss');
  const randomString = uuidv4();
  try {
    const cacheEntry = await createEntry({ key, value: randomString });
    return cacheEntry;
  } catch (error) {
    throw error;
  }
}

async function deleteAllEntries() {
  try {
    return cacheDB.deleteAllEntries();
  } catch (error) {
    throw error;
  }
}

async function deleteEntryByKey(key) {
  try {
    return cacheDB.deleteEntryByKey(key);
  } catch (error) {
    throw error;
  }
}

async function updateEntryByKey(key, value) {
  try {
    return cacheDB.updateEntryByKey(key, { value }, { new: true, upsert: true });
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllEntries, getEntry, deleteAllEntries, deleteEntryByKey, updateEntryByKey };
