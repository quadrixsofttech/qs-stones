const express = require('express');
const router = express.Router();

const { authenticate, signUp } = require('../controllers/auth.controller');

router.post('/authenticate', authenticate);

router.post('/signup', signUp);

module.exports = router;
