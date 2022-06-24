const express = require('express');

const router = express.Router();

const cacheController = require('../../controllers/cache');

router.get('/', cacheController.getAllEntries);

router.get('/:key', cacheController.getEntry);

module.exports = router;
