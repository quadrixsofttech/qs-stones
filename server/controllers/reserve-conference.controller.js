const ReserveConferenceService = require('../services/reserve-confrence/reserve-conference.service');
const { StatusCodes } = require('http-status-codes');

const createReservationController = async (req, res) => {
  try {
    const {
      floor,
      conferenceRoom,
      selectedDate,
      startAt,
      endAt,
      repeatReservation,
      selectedDay,
      everyDay,
      repeatOnSelectedDate,
      title,
      description,
      markerColor,
    } = req.body;

    const reservation = await ReserveConferenceService.createReservation({
      floor,
      conferenceRoom,
      selectedDate,
      startAt,
      endAt,
      repeatReservation,
      selectedDay,
      everyDay,
      repeatOnSelectedDate,
      title,
      description,
      markerColor,
    });

    return res.status(StatusCodes.CREATED).json(reservation);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

const getReservationsController = async (req, res) => {
  try {
    const reservations = await ReserveConferenceService.getReservations(req);
    return res.status(StatusCodes.OK).json(reservations);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createReservationController,
  getReservationsController,
};
