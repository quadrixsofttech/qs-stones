const ConferenceRoomReservation = require('../../models/conference-room-reservation');

const createReservation = async ({
  enabled,
  conferenceRoom,
  date,
  startTime,
  endTime,
  title,
  description,
  color,
  userId,
}) => {
  try {
    const reservation = new ConferenceRoomReservation({
      enabled,
      conferenceRoom,
      date,
      startTime,
      endTime,
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
    const reservations = await ConferenceRoomReservation.aggregate([
      {
        $match: {
          date: new Date(date),
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$userId'] },
              },
            },
            {
              $project: {
                _id: 0,
                firstName: 1,
                lastName: 1,
                src: 1,
              },
            },
          ],
          as: 'user',
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
      {
        $lookup: {
          from: 'conference-room-overviews',
          let: { conferenceRoom: '$conferenceRoom' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$conferenceRoom'] },
              },
            },
            {
              $project: {
                id: 1,
                name: 1,
                capacity: 1,
                floor: 1,
              },
            },
          ],
          as: 'conferenceRoom',
        },
      },
      {
        $addFields: {
          conferenceRoom: { $arrayElemAt: ['$conferenceRoom', 0] },
        },
      },
    ]);

    return reservations;
  } catch (err) {
    throw new Error(err);
  }
};

const updateReservation = async (id, update) => {
  try {
    const updateReservation = await ConferenceRoomReservation.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    return updateReservation;
  } catch (err) {
    throw new Error(err);
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