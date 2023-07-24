import { Icon } from '@chakra-ui/react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import React from 'react';

export default function CustomDatePicker({
  format,
  value,
  setReservationData,
}) {
  const datePickerRef = React.useRef(null);

  const handleReservationChange = (name, date) => {
    setReservationData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };
  return (
    <>
      <DatePicker
        ref={datePickerRef}
        className="custom-calendar"
        format={format}
        value={value}
        plugins={[<TimePicker hideSeconds mStep={15} />]}
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
