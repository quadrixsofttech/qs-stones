const express = require('express');
const router = express.Router();


//routes
const userRouter = require('../routes/user.routes');
const dashboardRouter = require('../routes/dashboard.routes');
const bioRouter = require('../routes/bio.routes');

router.use('/user', userRouter);
router.use('/dashboard-data', dashboardRouter);
router.use('/bio', bioRouter);

module.exports = router;
