const express = require('express');
const router = express.Router();

const { requireAuth } = require('../middleware/user');

const User = require('../controllers/bio.controller');

router.get('/', User.getBio);

router.patch('/', requireAuth, User.updateBio);

module.exports = router;
