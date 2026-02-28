const express = require('express');
const { getProviders, createProvider} = require('../controllers/providers');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProviders);

router.post('/', protect, createProvider);

module.exports = router;