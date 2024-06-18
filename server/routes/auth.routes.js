const express = require('express');
const router = express.Router();

const requireAdmin = require('../middleware/admin');

const AuthController = require('../controllers/auth.controller');

router.post('/authenticate', AuthController.authenticate);

router.post('/signup', requireAdmin, AuthController.signUp);

module.exports = router;
