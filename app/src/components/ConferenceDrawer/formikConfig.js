import moment from 'moment';
import * as Yup from 'yup';

const reservationSchema = Yup.object().shape({
  floor: Yup.string().required('Floor is required'),
  conferenceRoom: Yup.string().required('Conference room is required'),
  startAt: Yup.string().required('Start time is required'),
  endAt: Yup.string().required('End time is required'),
  title: Yup.string().required('Title is required'),
});

const initialValues = {
  floor: 'Upper Floor',
  conferenceRoom: 'Collaboration Room',
  selectedDate: moment(),
  startAt: '',
  endAt: '',
  startAtArray: '',
  endAtArray: '',
  repeatReservation: false,
  everyDay: false,
  title: '',
  description: '',
  markerColor: 'white',
};
export { reservationSchema, initialValues };
