const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/protected');

router.patch('/', user.updateRole);

router.get('/', requireAuth, user.getUser); //? :d

module.exports = router;
