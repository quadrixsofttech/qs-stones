const express = require("express");
const router = express.Router();
const PtoController = require("../controllers/pto.controller");

router.post('/', PtoController.createPaidTimeOff);
router.get('/', PtoController.getPendingPTO);
router.patch('/edit', PtoController.updateOnEdit);
router.patch('/approve', PtoController.approvePaidTimeOff);
router.patch('/reject', PtoController.rejectPaidTimeOff);
router.get('/history/:userId', PtoController.getUserHistory);
router.get('/remote-and-vacation', PtoController.getAwayUserCountForToday);
router.get('/:type', PtoController.getPaidTimeOff);
router.delete('/delete-remote-request/:id', PtoController.deleteRemoteRequest);

module.exports = router;
