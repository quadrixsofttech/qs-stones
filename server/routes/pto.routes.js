const express = require('express');
const router = express.Router();
const ptoController = require('../controllers/pto.controller');

router.post('/', ptoController.createPaidTimeOff);
router.get('/history', ptoController.getPaidTimeOffHistory);

module.exports = router;
