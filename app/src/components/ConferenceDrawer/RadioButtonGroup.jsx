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
import React, { useCallback } from 'react';
import DatePicker from 'react-multi-date-picker';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { useFormikContext } from 'formik';
import moment from 'moment';

const RadioButtonGroup = React.memo(({ f_option, s_option, t_option }) => {
  const datePickerRef = React.useRef(null);
  const { values, setFieldValue } = useFormikContext();

  const handleRadioChange = useCallback(
    (newValue) => {
      setFieldValue('meetingRepetition', newValue);
    },
    [setFieldValue]
  );

  const handleNumberOfOccurences = useCallback(
    (newValue) => {
      setFieldValue('numberOfOccurences', newValue);
    },
    [setFieldValue]
  );

  const handleIncrementNumberOfOccurences = useCallback(
    (newValue) => {
      setFieldValue('numberOfOccurences', newValue + 1);
    },
    [setFieldValue]
  );

  const handleDecrementNumberOfOccurences = useCallback(
    (newValue) => {
      setFieldValue('numberOfOccurences', newValue - 1);
    },
    [setFieldValue]
  );

  return (
    <RadioGroup onChange={handleRadioChange} value={values.meetingRepetition}>
      <Stack mt={1}>
        <Radio
          size="sm"
          value="Never"
          colorScheme="purple"
          isDisabled={values.repeatReservation ? false : true}
        >
          <Text fontSize="sm">{f_option}</Text>
        </Radio>
        <Radio
          size="sm"
          value="After n occurences"
          colorScheme="purple"
          isDisabled={values.repeatReservation ? false : true}
        >
          <Flex alignItems={'center'} gap={3}>
            <Text fontSize="sm">{s_option}</Text>
            <NumberInput
              size="xs"
              maxW={16}
              defaultValue={1}
              min={1}
              value={values.numberOfOccurences}
              max={40}
              clampValueOnBlur={false}
              isDisabled={
                values.meetingRepetition === 'After n occurences' ? false : true
              }
              onChange={handleNumberOfOccurences}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onChange={handleIncrementNumberOfOccurences}
                />
                <NumberDecrementStepper
                  onChange={handleDecrementNumberOfOccurences}
                />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="sm">occurences</Text>
          </Flex>
        </Radio>
        <Radio
          size="sm"
          value="On specific date"
          colorScheme="purple"
          isDisabled={values.repeatReservation ? false : true}
        >
          <Text fontSize="sm">{t_option}</Text>
        </Radio>
        <Text
          fontSize="sm"
          color={
            values.repeatReservation &&
            values.meetingRepetition !== 'Never' &&
            values.meetingRepetition !== 'After n occurences'
              ? 'gray.700'
              : 'gray.200'
          }
        >
          Select date:
        </Text>
        <DatePicker
          ref={datePickerRef}
          minDate={new moment().format('YYYY-MM-DD')}
          disabled={
            values.repeatReservation &&
            values.meetingRepetition !== 'Never' &&
            values.meetingRepetition !== 'After n occurences'
              ? false
              : true
          }
          className="custom-calendar"
          value={moment(values.selectedDateFromInput).format('YYYY-MM-DD')}
          onChange={(value) => setFieldValue('selectedDateFromInput', value)}
        />
        {values.repeatReservation &&
        values.meetingRepetition !== 'Never' &&
        values.meetingRepetition !== 'After n occurences' ? (
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
});

export default RadioButtonGroup;
