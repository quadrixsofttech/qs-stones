const express = require('express');
const csrf = require('csurf');
const authRouter = require('./auth.routes');
const csrfRouter = require('./csrf-token.routes');
const inventoryRouter = require('./inventory.routes');
const userRouter = require('./user.routes');
const dashboardRouter = require('./dashboard.routes');
const bioRouter = require('./bio.routes');
const ptoRouter = require('./pto.routes');
const conferenceRoomRouter = require('./conference-room.routes');
const kitchenRouter = require('./kitchen.routes');
const { attachUser } = require('../middleware/user');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.use('/', authRouter);
router.use(csrfProtection);
router.use(attachUser);
router.use('/csrf-token', csrfRouter);
router.use('/dashboard-data', dashboardRouter);
router.use('/', userRouter);
router.use('/bio', bioRouter);
router.use('/inventory', inventoryRouter);
router.use('/paid-time-off', ptoRouter);
router.use('/conference-rooms', conferenceRoomRouter);
router.use('/kitchen', kitchenRouter);

module.exports = router;
