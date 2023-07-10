const express = require('express');
const router = express.Router();

const ConferenceRoomReservation = require('../controllers/conference-room-reservation.controller');

router.get('/', ConferenceRoomReservation.getReservations);
router.post('/', ConferenceRoomReservation.createReservation);
router.patch('/update/:id', ConferenceRoomReservation.updateReservation);
router.delete('/delete/:id', ConferenceRoomReservation.deleteReservation);

module.exports = router;
