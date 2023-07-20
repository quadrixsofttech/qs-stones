const ConferenceRoomReservation = require('../services/conference-room-reservation/conference-room-reservation.service');
const { StatusCodes } = require('http-status-codes');

const createReservation = async (req, res) => {
  try {
    const {
      conferenceRoom,
      date,
      startTime,
      endTime,
      title,
      description,
      color,
      userId,
    } = req.body;

    const reservation = await ConferenceRoomReservation.createReservation({
      conferenceRoom,
      date,
      startTime,
      endTime,
      title,
      description,
      color,
      userId,
    });
    return res.send(reservation);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

const getReservations = async (req, res) => {
  try {
    const { date } = req.body;
    const reservations = await ConferenceRoomReservation.getReservations(date);
    return res.send(reservations);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      column,
      date,
      startTime,
      endTime,
      title,
      description,
      color,
      userId,
    } = req.body;
    const update = await ConferenceRoomReservation.updateReservation(id, {
      column,
      date,
      startTime,
      endTime,
      title,
      description,
      color,
      userId,
    });
    return res.send(update);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ConferenceRoomReservation.deleteReservation(id);
    return res.send(deleted);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
};
