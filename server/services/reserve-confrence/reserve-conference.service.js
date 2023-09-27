const Reservation = require('../../models/conference-room-reservation');

const createReservation = async ({
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
}) => {
  try {
    const reservation = new Reservation({
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

    await reservation.save();
    return reservation;
  } catch (err) {
    throw new Error(err);
  }
};

const getReservations = async () => {
  try {
    const reservations = await Reservation.find().lean();
    return reservations;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { createReservation, getReservations };
