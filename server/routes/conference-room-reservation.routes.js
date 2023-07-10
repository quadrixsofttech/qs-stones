const express = require('express');
const router = express.Router();

const ConferenceRoomReservation = require('../controllers/conference-room-reservation.controller');

router.get('/', ConferenceRoomReservation.getReservations);
router.post('/', ConferenceRoomReservation.createReservation);

module.exports = router;
