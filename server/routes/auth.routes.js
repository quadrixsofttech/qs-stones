const express = require('express');
const router = express.Router();

const user = require('../controllers/auth.controller');

router.post('/signup', user.signUp);

router.post('/authenticate', user.authenticate);

module.exports = router;
