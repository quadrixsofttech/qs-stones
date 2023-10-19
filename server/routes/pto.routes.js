const express = require('express');
const router = express.Router();
const PtoController = require('../controllers/pto.controller');

router.post('/', PtoController.createPaidTimeOff);
router.patch('/', PtoController.updatePaidTimeOff);
router.get('/history/:userId', PtoController.getUserHistory);
router.get('/:type', PtoController.getPaidTimeOff);

module.exports = router;
