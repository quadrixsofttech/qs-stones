import * as Yup from 'yup';
import moment from 'moment';

const reservationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  startTime: Yup.string().required('Start time for meeting is required'),
  endTime: Yup.string().required('End time for meeting is required'),
});

const initialValues = {
  floor: 'Upper Floor',
  column: '64a81903e616253053727684',
  confRoomName: 'Large Conference Room',
  selectedDate: moment(),
  startTime: '',
  endTime: '',
  startAtArray: '',
  endAtArray: '',
  selectedDatesInDays: [],
  repeatReservation: false,
  meetingRepetition: 'Never',
  reccuring: false,
  numberOfOccurences: 1,
  everyDay: false,
  title: '',
  description: '',
  selectedDateFromInput: moment().add(1, 'day'),
  markerColor: 'purple.400',
  userId: 'a',
};
export { reservationSchema, initialValues };
