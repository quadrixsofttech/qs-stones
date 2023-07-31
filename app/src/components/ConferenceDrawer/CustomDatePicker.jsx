import { Icon } from '@chakra-ui/react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import DatePicker from 'react-multi-date-picker';
import React, { useState } from 'react';

export default function CustomDatePicker({
  format,
  field,
  name,
  onDateChange,
}) {
  const datePickerRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = useState(field.value || new Date());

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
