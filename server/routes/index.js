const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const csrfRouter = require('./token.routes');

router.post('/', authRouter);
router.use('/csrf-token', csrfRouter);

module.exports = router;
