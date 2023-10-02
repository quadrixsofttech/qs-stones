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
  repeatReservation: {
    type: Boolean,
    default: false,
  },
  selectedDaysInTheWeek: {
    type: String,
  },
  everyDay: {
    type: Boolean,
    default: false,
  },
  endReservation: {
    type: String,
    enum: ['Never', 'After n occurences', 'On selected date'],
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
