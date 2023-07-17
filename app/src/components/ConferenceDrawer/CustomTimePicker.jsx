import { Icon } from '@chakra-ui/react';
import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

export default function CustomTimePicker({ switchIsChecked }) {
  const datePickerRef = React.useRef(null);
  return (
    <>
      <DatePicker
        ref={datePickerRef}
        disableDayPicker
        className="custom-calendar"
        disabled={switchIsChecked ? false : true}
        format="HH:mm:ss"
        position="top"
        plugins={[<TimePicker mStep={15} hideSeconds />]}
      />
      <Icon
        as={FaRegClock}
        onClick={() => {
          datePickerRef.current?.isOpen
            ? datePickerRef.current?.closeCalendar()
            : datePickerRef.current?.openCalendar();
        }}
        position="relative"
        left={'15em'}
        marginLeft={'20px'}
        transform="translateY(-220%)"
        cursor="pointer"
      />
    </>
  );
}
