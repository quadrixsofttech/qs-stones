import { Icon } from '@chakra-ui/react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import DatePicker from 'react-multi-date-picker';
import React from 'react';
import moment from 'moment';

export default function CustomDatePicker({
  format,
  field,
  name,
  onDateChange,
  selectedDate,
  setSelectedDate,
}) {
  const datePickerRef = React.useRef(null);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    field.onChange({ target: { name, value } });
    if (onDateChange) {
      onDateChange(value);
    }
  };

  return (
    <>
      <DatePicker
        minDate={new moment().format('YYYY-MM-DD')}
        name={name}
        ref={datePickerRef}
        className="custom-calendar"
        format={format}
        value={selectedDate}
        onChange={handleDateChange}
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
