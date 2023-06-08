const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/protected');
const user = require('../controllers/user.controller');

router.get('/', requireAuth, user.getBio);

router.patch('/:id', requireAuth, user.updateBio);

module.exports = router;
