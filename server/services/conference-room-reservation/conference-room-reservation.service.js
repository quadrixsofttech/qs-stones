const conferenceRoom = require('../../models/conference-room');
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
    // const reservations = await ConferenceRoomReservation.aggregate([
    //   {
    //     $match: {
    //       date: new Date(date),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       let: { userId: '$userId' },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: { $eq: ['$_id', '$$userId'] },
    //           },
    //         },
    //         {
    //           $project: {
    //             _id: 0,
    //             firstName: 1,
    //             lastName: 1,
    //             src: 1,
    //           },
    //         },
    //       ],
    //       as: 'user',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       user: { $arrayElemAt: ['$user', 0] },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'conference-room-overviews',
    //       let: { conferenceRoom: '$conferenceRoom' },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: { $eq: ['$_id', '$$conferenceRoom'] },
    //           },
    //         },
    //       ],
    //       as: 'conferenceRoom',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       conferenceRoom: { $arrayElemAt: ['$conferenceRoom', 0] },
    //       column: { $arrayElemAt: ['$conferenceRoom.name', 0] },
    //       floor: { $arrayElemAt: ['$conferenceRoom.floor', 0] },
    //       id: { $arrayElemAt: ['$conferenceRoom.id', 0] },
    //     },
    //   },
    // ]);

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
