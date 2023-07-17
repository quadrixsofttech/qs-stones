const express = require('express');
const router = express.Router();

const ConferenceRoomController = require('../controllers/conference-room.controller');

router.get('/', ConferenceRoomController.getConferenceRooms);

module.exports = router;
