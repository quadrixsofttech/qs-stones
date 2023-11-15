const ConferenceRoom = require('../../models/conference-room');

const createConferenceRoom = async ({
  id,
  name,
  capacity,
  equipment,
  img,
  floor,
}) => {
  try {
    const conferenceRoom = new ConferenceRoom({
      id,
      name,
      capacity,
      equipment,
      img,
      floor,
    });
    await conferenceRoom.save();
    return conferenceRoom;
  } catch (err) {
    throw new Error(err);
  }
};

const getConferenceRoom = async () => {
  try {
    const rooms = await ConferenceRoom.find().lean();
    return rooms;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { createConferenceRoom, getConferenceRoom };
