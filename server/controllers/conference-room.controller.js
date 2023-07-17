const ConferenceRoomService = require('../services/conference-room/conference-room.service');
const { StatusCodes } = require('http-status-codes');

const getConferenceRooms = async (req, res) => {
  try {
    const rooms = await ConferenceRoomService.getConferenceRoom();
    return res.json(rooms);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

module.exports = {
  getConferenceRooms,
};
