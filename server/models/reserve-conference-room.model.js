const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new mongoose.Schema({
  floor: {
    type: String,
    required: true,
  },
  conferenceRoom: {
    type: Schema.Types.ObjectId,
    ref: 'ConferenceRoomSchema',
    required: true,
  },
  selectedDate: {
    type: Date,
    default: Date.now,
  },
  startAt: {
    type: String,
    required: true,
  },
  endAt: {
    type: String,
    required: true,
  },
  repeatReservation: {
    type: Boolean,
    default: false,
  },
  selectedDay: {
    type: String,
  },
  everyDay: {
    type: Boolean,
    default: false,
  },
  repeatOnSelectedDate: {
    type: Date,
    required: false,
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
  description: {
    type: String,
    default: '',
    required: true,
  },
  markerColor: {
    type: String,
    default: 'white',
  },
});

module.exports = mongoose.model('reservation', ReservationSchema);
