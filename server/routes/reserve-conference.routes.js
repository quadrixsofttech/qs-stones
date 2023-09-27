const express = require('express');
const router = express.Router();

const ReserveConferenceController = require('../controllers/reserve-conference.controller');

router.post('/', ReserveConferenceController.createReservationController);
router.get('/', ReserveConferenceController.getReservationsController);

module.exports = router;
