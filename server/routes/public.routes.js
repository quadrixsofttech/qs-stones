const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const authRouter = require('./auth.routes');
const csrfRouter = require('./csrf-token.routes');
const inventoryRouter = require('./inventory.routes');
const userRouter = require('./user.routes');
const dashboardRouter = require('./dashboard.routes');
const bioRouter = require('./bio.routes');

router.use('/', authRouter);

const { attachUser, requireAuth } = require('../middleware/user');

router.use(attachUser);
router.use(csrfProtection);
router.use('/csrf-token', csrfRouter);
router.use('/dashboard-data', dashboardRouter);
router.use('/', userRouter);
router.use('/bio', bioRouter);
router.use('/inventory', inventoryRouter);

module.exports = router;
