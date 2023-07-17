import { Icon } from '@chakra-ui/react';
import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

export default function CustomTimePicker({
  switchIsChecked,
  repeatReservation,
}) {
  const datePickerRef = React.useRef(null);
  return (
    <>
      <DatePicker
        ref={datePickerRef}
        disableDayPicker
        className="custom-calendar"
        disabled={
          switchIsChecked &&
          repeatReservation !== 'never' &&
          repeatReservation !== 'after'
            ? false
            : true
        }
        format="HH:mm:ss"
        position="left"
        plugins={[<TimePicker mStep={15} hideSeconds />]}
      />
      {switchIsChecked &&
      repeatReservation !== 'never' &&
      repeatReservation !== 'after' ? (
        <Icon
          as={FaRegClock}
          onClick={() => {
            datePickerRef.current?.isOpen
              ? datePickerRef.current?.closeCalendar()
              : datePickerRef.current?.openCalendar();
          }}
          position="relative"
          left={'90%'}
          transform="translateY(-220%)"
          cursor="pointer"
        />
      ) : (
        <Icon
          as={FaRegClock}
          color={'gray.200'}
          position="relative"
          left={'90%'}
          transform="translateY(-220%)"
        />
      )}
    </>
  );
}
