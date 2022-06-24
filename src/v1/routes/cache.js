const express = require('express');

const router = express.Router();

const cacheController = require('../../controllers/cache');

router.get('/', cacheController.getAllEntries);

router.delete('/', cacheController.deleteAllEntries);

router.get('/:key', cacheController.getEntry);

router.patch('/:key', cacheController.updateEntry);

router.delete('/:key', cacheController.deleteEntry);

module.exports = router;
