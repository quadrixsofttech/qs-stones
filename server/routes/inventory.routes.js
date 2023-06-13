const express = require('express');
const router = express.Router();

const requireAdmin = require('../middleware/admin');
const { requireAuth } = require('../middleware/user');
const Inventory = require('../controllers/inventory.controller');

router.get('/', requireAdmin, requireAuth, Inventory.getItem);

router.post('/', requireAdmin, requireAuth, Inventory.createItem);

router.delete('/:id', requireAdmin, requireAuth, Inventory.deleteItem);

module.exports = router;
