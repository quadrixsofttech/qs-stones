const express = require('express');
const { requireAuth } = require('../middleware/user');
const { getUser, updateUserRole } = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', requireAuth, getUser);

router.patch('/user-role', updateUserRole);

module.exports = router;
