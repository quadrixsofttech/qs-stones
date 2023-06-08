const express = require('express');
const router = express.Router();
const requireAdmin = require('./admin');

//routes
const inventoryRouter = require('../routes/inventory.routes');

router.use('/inventory', requireAdmin, inventoryRouter);

module.exports = router;
