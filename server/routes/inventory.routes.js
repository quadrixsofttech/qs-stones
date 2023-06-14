const express = require('express');
const router = express.Router();

const requireAdmin = require('../middleware/admin');
const Inventory = require('../controllers/inventory.controller');

router.get('/', requireAdmin, Inventory.getItem);

router.post('/', requireAdmin, Inventory.createItem);

router.delete('/:id', requireAdmin, Inventory.deleteItem);

module.exports = router;
