const ConferenceRoomReservation = require('../../models/conference-room-reservation');

const createReservation = async ({
  conferenceRoom,
  date,
  startTime,
  endTime,
  selectedDatesInDays,
  title,
  description,
  color,
  userId,
}) => {
  try {
    const existingReservation = await ConferenceRoomReservation.findOne({
      conferenceRoom,
      date,
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gt: startTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: startTime } },
            { endTime: { $lte: endTime } },
          ],
        },
      ],
    });

    if (existingReservation) {
      throw new Error(
        'A conference room cannot be reserved for that time because it is taken.'
      );
    }
    const reservation = new ConferenceRoomReservation({
      conferenceRoom,
      date,
      startTime,
      endTime,
      selectedDatesInDays,
      title,
      description,
      color,
      userId,
    });
    await reservation.save();
    return reservation;
  } catch (err) {
    throw new Error(err);
  }
};

const getReservations = async (date) => {
  try {
    const reservationsFull = await ConferenceRoomReservation.find({
      date: date,
    })
      .populate({ path: 'userId', select: '_id firstName lastName' })
      .populate('conferenceRoom');

    const reservations = reservationsFull.map((reservation) => ({
      _id: reservation._id,
      userId: reservation.userId._id,
      date: reservation.date,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      title: reservation.title,
      description: reservation.description,
      color: reservation.color,
      floor: reservation.conferenceRoom.floor,
      column: reservation.conferenceRoom.name,
      id: reservation.conferenceRoom.id,
      user: {
        firstName: reservation.userId.firstName,
        lastName: reservation.userId.lastName,
      },
    }));

    return reservations;
  } catch (err) {
    throw new Error(err);
  }
};

const updateReservation = async (id, update) => {
  try {
    const existingReservation = await ConferenceRoomReservation.findOne({
      _id: update._id,
      conferenceRoom: update.conferenceRoom,
      selectedDate: update.selectedDate,
      $or: [
        {
          $and: [
            { startTime: { $lte: update.startTime } },
            { endTime: { $gt: update.startTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lt: update.endTime } },
            { endTime: { $gte: update.endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: update.startTime } },
            { endTime: { $lte: update.endTime } },
          ],
        },
      ],
    });

    if (existingReservation) {
      throw new Error(
        'A conference room cannot be reserved for that time because it is taken.'
      );
    }

    const updatedReservation =
      await ConferenceRoomReservation.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      );
    return updatedReservation;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteReservation = async (id) => {
  try {
    const reservation = await ConferenceRoomReservation.findByIdAndDelete(id);
    return reservation;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
};
