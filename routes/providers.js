const express = require('express');
const { getProviders, createProvider} = require('../controllers/providers');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProviders);

router.post('/', protect, authorize("admin"), createProvider);

module.exports = router;