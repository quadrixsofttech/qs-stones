const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConferenceRoomReservationSchema = new Schema({
  conferenceRoom: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model(
  'conference-room-reservation',
  ConferenceRoomReservationSchema
);
