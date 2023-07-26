import * as Yup from 'yup';

const reservationSchema = Yup.object().shape({
  floor: Yup.string().required('Floor is required'),
  conferenceRoom: Yup.string().required('Conference room is required'),
  startAt: Yup.date().required('Start time is required'),
  endAt: Yup.date().required('End time is required'),
  title: Yup.string().required('Title is required'),
});

const initialValues = {
  floor: '',
  conferenceRoom: '',
  startAt: '',
  endAt: '',
  repeatReservation: false,
  everyDay: false,
  title: '',
  description: '',
  markerColor: '',
};
export { reservationSchema, initialValues };
