const ConferenceRoomReservation = require('../services/conference-room-reservation/conference-room-reservation.service');
const { StatusCodes } = require('http-status-codes');

const createReservation = async (req, res) => {
  try {
    const {
      column,
      date,
      start_time,
      end_time,
      title,
      description,
      color,
      userId,
    } = req.body;

    const reservation = await ConferenceRoomReservation.createReservation({
      column,
      date,
      start_time,
      end_time,
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

const updateReservation = async (req, res) => {};

const deleteReservation = async (req, res) => {};

module.exports = {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
};
