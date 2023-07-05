const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/user');

router.get('/', requireAuth, (req, res) => res.json(dashboardData));

module.exports = router;
