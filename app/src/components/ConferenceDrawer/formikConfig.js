import moment from 'moment';
import * as Yup from 'yup';

const reservationSchema = Yup.object().shape({
  floor: Yup.string().required('Floor is required'),
  column: Yup.string().required('Conference room is required'),
  startAt: Yup.string().required('Start time is required'),
  endAt: Yup.string().required('End time is required'),
  title: Yup.string().required('Title is required'),
});

const initialValues = {
  floor: 'Upper Floor',
  column: 'Collaboration Room',
  selectedDate: moment(),
  startTime: '',
  endTime: '',
  startAtArray: '',
  endAtArray: '',
  repeatReservation: false,
  meetingRepetition: 'Never',
  numberOfOccurences: 1,
  everyDay: false,
  title: '',
  description: '',
  selectedDateFromInput: moment().add(1, 'day'),
  markerColor: 'white',
};
export { reservationSchema, initialValues };
