const express = require('express');
const router = express.Router();

const requireAdmin = require('../middleware/admin');
const InventoryController = require('../controllers/inventory.controller');

router.get('/', requireAdmin, InventoryController.getItem);

router.post('/', requireAdmin, InventoryController.createItem);

router.delete('/:id', requireAdmin, InventoryController.deleteItem);

module.exports = router;
