const cacheService = require('../services/cache');

async function getAllEntries(req, res) {
  try {
    const entries = await cacheService.getAllEntries();
    return res.json({ status: true, data: entries });
  } catch (error) {
    console.error('Error getting all entries', error);
    return res.status(500)
      .json({ status: false, message: 'Error getting all entries,try again later' });
  }
}

async function getEntry(req, res) {
  const key = Object(req.params.key);
  if (!key) {
    return res.status(400).json({ status: false, message: 'key is required in params' });
  }
  try {
    const entry = await cacheService.getEntry(key);
    return res.json({ status: true, data: entry });
  } catch (error) {
    console.error('Error getting entry', error);
    return res.status(500)
      .json({ status: false, message: 'Error getting entry,try again later' });
  }
}

async function updateEntry(req, res) {
  const key = Object(req.params.key);
  const value = Object(req.body.value);
  if (!key || !key.length > 0) {
    return res.status(400).json({ status: false, message: 'key is required in params' });
  }
  if (!value || !value.length > 0) {
    return res.status(400).json({ status: false, message: 'Value is required in request body' });
  }
  try {
    const entry = await cacheService.updateEntryByKey(key, value);
    return res.json({ status: true, data: entry });
  } catch (error) {
    console.error('Error updating entry', error);
    return res.status(500)
      .json({ status: false, message: 'Error updating entry,try again later' });
  }
}

async function deleteEntry(req, res) {
  const key = Object(req.params.key);
  if (!key) {
    return res.status(400).json({ status: false, message: 'key is required in params' });
  }
  try {
    const deletedEntry = await cacheService.deleteEntryByKey(key);
    return res.json({ status: true, data: deletedEntry });
  } catch (error) {
    console.error('Error deleting entry', error);
    return res.status(500)
      .json({ status: false, message: 'Error deleting entry,try again later' });
  }
}

async function deleteAllEntries(req, res) {
  const key = Object(req.params.key);
  if (!key) {
    return res.status(400).json({ status: false, message: 'key is required in params' });
  }
  try {
    await cacheService.deleteAllEntries(key);
    return res.json({ status: true, data: 'Cache cleared!' });
  } catch (error) {
    console.error('Error deleting entry', error);
    return res.status(500)
      .json({ status: false, message: 'Error clearing cache,try again later' });
  }
}

module.exports = {
  getAllEntries, getEntry, deleteEntry, deleteAllEntries, updateEntry
};
