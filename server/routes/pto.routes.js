const express = require('express');
const router = express.Router();
const PtoController = require('../controllers/pto.controller');

router.post('/', PtoController.createPaidTimeOff);
router.get('/history/:userId', PtoController.getUserHistory);

module.exports = router;
