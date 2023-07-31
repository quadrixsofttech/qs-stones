import { Icon } from '@chakra-ui/react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import DatePicker from 'react-multi-date-picker';
import React from 'react';

export default function CustomDatePicker({ format, field, name }) {
  const datePickerRef = React.useRef(null);

  return (
    <>
      <DatePicker
        name={name}
        ref={datePickerRef}
        className="custom-calendar"
        format={format}
        value={field.value}
        onChange={(value) => field.onChange({ target: { name, value } })}
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
