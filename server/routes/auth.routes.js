const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');

router.post('/authenticate', AuthController.authenticate);

router.post('/signup', AuthController.signUp);

module.exports = router;
