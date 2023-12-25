const express = require('express');
const router = express.Router();
const PtoController = require('../controllers/pto.controller');

router.post('/', PtoController.createPaidTimeOff);
router.patch('/', PtoController.updatePaidTimeOff);
router.patch('/approve', PtoController.approvePaidTimeOff);
router.patch('/reject', PtoController.rejectPaidTimeOff);
router.get('/history/:userId', PtoController.getUserHistory);
router.get('/:type', PtoController.getPaidTimeOff);
router.get('/remote-ptos-today', PtoController.getRemoteUsersForToday);

module.exports = router;
