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
  column: '64a8185c62c2382ff77231ca',
  confRoomName: 'Brainstorm Room',
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
  markerColor: 'white',
  userId: 'a',
};
export { reservationSchema, initialValues };
