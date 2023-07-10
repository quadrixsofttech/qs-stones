const express = require('express');
const router = express.Router();

const ConferenceRoomReservation = require('../controllers/conference-room-reservation.controller');

router.get('/', ConferenceRoomReservation.getReservations);
router.post('/', ConferenceRoomReservation.createReservation);
router.patch('/:id', ConferenceRoomReservation.updateReservation);
router.delete('/:id', ConferenceRoomReservation.deleteReservation);

module.exports = router;
