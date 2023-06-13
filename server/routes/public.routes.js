const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const authRouter = require('./auth.routes');
const csrfRouter = require('./csrf-token.routes');

router.use('/', authRouter);

const { attachUser } = require('../middleware/user');

router.use(attachUser);
router.use(csrfProtection);
router.use('/csrf-token', csrfRouter);

module.exports = router;
