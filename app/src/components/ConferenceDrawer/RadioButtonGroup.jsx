import {
  Flex,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import DatePicker from 'react-multi-date-picker';
import CustomTimePicker from './CustomTimePicker';
import { AiTwotoneCalendar } from 'react-icons/ai';

export default function RadioButtonGroup({
  f_option,
  s_option,
  t_option,
  switchIsChecked,
}) {
  const datePickerRef = React.useRef(null);
  const [repeatReservation, setRepeatReservation] = React.useState('never');

  const handleRadioChange = (newValue) => {
    setRepeatReservation(newValue);
  };

  return (
    <RadioGroup onChange={handleRadioChange} value={repeatReservation}>
      <Stack mt={1}>
        <Radio
          size="sm"
          value="never"
          colorScheme="purple"
          isDisabled={switchIsChecked ? false : true}
        >
          <Text fontSize="sm">{f_option}</Text>
        </Radio>
        <Radio
          size="sm"
          value="after"
          colorScheme="purple"
          isDisabled={switchIsChecked ? false : true}
        >
          <Flex alignItems={'center'} gap={3}>
            <Text fontSize="sm">{s_option}</Text>
            <NumberInput
              size="xs"
              maxW={16}
              defaultValue={1}
              min={1}
              max={40}
              clampValueOnBlur={false}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="sm">occurences</Text>
          </Flex>
        </Radio>
        <Radio
          size="sm"
          value="on specific date"
          colorScheme="purple"
          isDisabled={switchIsChecked ? false : true}
        >
          <Text fontSize="sm">{t_option}</Text>
        </Radio>
        <Text
          fontSize="sm"
          color={
            switchIsChecked &&
            repeatReservation !== 'never' &&
            repeatReservation !== 'after'
              ? 'gray.700'
              : 'gray.200'
          }
        >
          Select date:
        </Text>
        <DatePicker
          ref={datePickerRef}
          disabled={
            switchIsChecked &&
            repeatReservation !== 'never' &&
            repeatReservation !== 'after'
              ? false
              : true
          }
          className="custom-calendar"
          format="MM/DD/YYYY"
        />
        {switchIsChecked &&
        repeatReservation !== 'never' &&
        repeatReservation !== 'after' ? (
          <Icon
            as={AiTwotoneCalendar}
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
            as={AiTwotoneCalendar}
            color={'gray.200'}
            onClick={() => {
              datePickerRef.current?.isOpen
                ? datePickerRef.current?.closeCalendar()
                : datePickerRef.current?.openCalendar();
            }}
            position="relative"
            left={'90%'}
            transform="translateY(-220%)"
          />
        )}
      </Stack>
    </RadioGroup>
  );
}
