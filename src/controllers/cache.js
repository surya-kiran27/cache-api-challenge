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

module.exports = { getAllEntries, getEntry };
