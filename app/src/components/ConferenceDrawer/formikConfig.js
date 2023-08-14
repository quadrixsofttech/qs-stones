import * as Yup from 'yup';

const reservationSchema = Yup.object().shape({
  floor: Yup.string().required('Floor is required'),
  conferenceRoom: Yup.string().required('Conference room is required'),
  startAt: Yup.date().required('Start time is required'),
  endAt: Yup.date().required('End time is required'),
  title: Yup.string().required('Title is required'),
});

const initialValues = {
  id:'',
  floor: '',
  column: '',
  startTime: '',
  endTime: '',
  date:'',
  repeatReservation: false,
  everyDay: false,
  title: '',
  description: '',
  color: '',
};
export { reservationSchema, initialValues };
