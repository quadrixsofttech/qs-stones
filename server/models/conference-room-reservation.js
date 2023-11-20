const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConferenceRoomReservationSchema = new Schema({
  conferenceRoom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'conference-room-overview',
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
  recurring: {
    type: Boolean,
    default: false,
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
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(
  'conference-room-reservation',
  ConferenceRoomReservationSchema
);
