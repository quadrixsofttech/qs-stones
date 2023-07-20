const express = require('express');
const router = express.Router();

const ConferenceRoomController = require('../controllers/conference-room.controller');
const ConferenceRoomReservation = require('../controllers/conference-room-reservation.controller');

router.get('/', ConferenceRoomController.getConferenceRooms);
router.get('/reservations', ConferenceRoomReservation.getReservations);
router.post('/reservations', ConferenceRoomReservation.createReservation);
router.patch('/reservations/:id', ConferenceRoomReservation.updateReservation);
router.delete('/reservations/:id', ConferenceRoomReservation.deleteReservation);

module.exports = router;
