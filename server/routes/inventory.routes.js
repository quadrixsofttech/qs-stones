const express = require('express');
const router = express.Router();
const requireAdmin = require('../middleware/admin');
const { requireAuth } = require('../middleware/protected');
const user = require('../controllers/inventory.controller');

router.get('/', requireAuth, requireAdmin, user.getInventory);

router.post('/', requireAuth, requireAdmin, user.createInventoryItem);

router.delete('/:id', requireAuth, requireAdmin, user.deleteInventoryItem);

module.exports = router;
