import { Icon } from '@chakra-ui/react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import DatePicker from 'react-multi-date-picker';
import React from 'react';
import moment from 'moment';
import { useFormikContext } from 'formik';

export default function CustomDatePicker({ name, isEditMode }) {
  const datePickerRef = React.useRef(null);
  const { values, setFieldValue } = useFormikContext();

  return (
    <>
      <DatePicker
        minDate={new moment().format('YYYY-MM-DD')}
        name={name}
        ref={datePickerRef}
        className="custom-calendar"
        format={'YYYY-MM-DD'}
        value={
          isEditMode
            ? moment(values.selectedDate).format('YYYY-MM-DD')
            : new moment().format('YYYY-MM-DD')
        }
        onChange={(value) => setFieldValue('selectedDate', value)}
      />
      <Icon
        as={AiTwotoneCalendar}
        onClick={() => {
          datePickerRef.current?.isOpen
            ? datePickerRef.current?.closeCalendar()
            : datePickerRef.current?.openCalendar();
        }}
        position="relative"
        left={'90%'}
        transform="translateY(-200%)"
        cursor="pointer"
      />
    </>
  );
}
