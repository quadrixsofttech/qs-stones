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

const createRepeatReservations = async ({
  conferenceRoom,
  date,
  startTime,
  endTime,
  title,
  description,
  color,
  userId,
  repeatReservation,
  selectedDaysInTheWeek,
  everyDay,
  endReservation,
}) => {
  try {
    const reservations = [];
    const startDate = moment(date);
    
    switch (endReservation) {
      case 'Never':
        while (startDate.year() === moment().year()) {
          if (!selectedDaysInTheWeek || selectedDaysInTheWeek.includes(startDate.format('dddd'))) {
            const reservation = new ConferenceRoomReservation({
              conferenceRoom,
              date: startDate.toDate(),
              startTime,
              endTime,
              title,
              description,
              color,
              userId,
            });
            reservations.push(reservation);
          }
          startDate.add(1, 'weeks');
        }
        break;

      case 'After n occurrences':
        const n = parseInt(repeatReservation, 10); //ove treba value od onog chakrinog inputa
        for (let i = 0; i < n; i++) {
          const reservation = new ConferenceRoomReservation({
            conferenceRoom,
            date: startDate.toDate(),
            startTime,
            endTime,
            title,
            description,
            color,
            userId,
          });
          reservations.push(reservation);
          startDate.add(1, 'weeks');
        }
        break;

      case 'On selected date':
        const endDate = moment(endReservationDate);
        while (startDate.isSameOrBefore(endDate)) {
          if (!selectedDaysInTheWeek || selectedDaysInTheWeek.includes(startDate.format('dddd'))) {
            const reservation = new ConferenceRoomReservation({
              conferenceRoom,
              date: startDate.toDate(),
              startTime,
              endTime,
              title,
              description,
              color,
              userId,
            });
            reservations.push(reservation);
          }
          startDate.add(1, 'weeks');
        }
        break;
    }

    const savedReservations = await ConferenceRoomReservation.insertMany(reservations);
    return savedReservations;
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
          ],
          as: 'conferenceRoom',
        },
      },
      {
        $addFields: {
          conferenceRoom: { $arrayElemAt: ['$conferenceRoom', 0] },
          column: { $arrayElemAt: ['$conferenceRoom.name', 0] },
          floor: { $arrayElemAt: ['$conferenceRoom.floor', 0] },
          id: { $arrayElemAt: ['$conferenceRoom.id', 0] },
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
