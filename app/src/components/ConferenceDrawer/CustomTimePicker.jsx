import { Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import moment from 'moment';

export default function CustomTimePicker({
  switchIsChecked,
  repeatReservation,
  onTimeChange,
  field,
  name,
}) {
  const datePickerRef = React.useRef(null);
  const [selectedTime, setSelectedTime] = useState(field?.value || moment());

  const handleTimeChange = (value) => {
    setSelectedTime(value.format('HH:mm'));
    if (field) {
      field.onChange({ target: { value, name } });
    }
    if (onTimeChange) {
      onTimeChange(value);
    }
  };

  console.log(selectedTime);

  return (
    <>
      <DatePicker
        ref={datePickerRef}
        disableDayPicker
        value={selectedTime}
        onChange={handleTimeChange}
        className="custom-calendar"
        disabled={
          switchIsChecked &&
          repeatReservation !== 'never' &&
          repeatReservation !== 'after'
            ? false
            : true
        }
        format="HH:mm"
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
