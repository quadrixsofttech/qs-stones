const express = require('express');
const router = express.Router();
const dashboardData = require('../data/dashboard');
const { attachUser, requireAuth } = require('../middleware/protected');

router.get('/', requireAuth, attachUser, (req, res) => {
  res.json(dashboardData);
});

module.exports = router;
