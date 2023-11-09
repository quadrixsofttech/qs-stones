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
import MeetingRepetition from '../../constants/MeetingRepetition';

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
          value={MeetingRepetition.NEVER}
          colorScheme="purple"
          isDisabled={values.reccuring ? false : true}
        >
          <Text fontSize="sm">{f_option}</Text>
        </Radio>
        <Radio
          size="sm"
          value={MeetingRepetition.AFTER_N_OCCURENCES}
          colorScheme="purple"
          isDisabled={values.reccuring ? false : true}
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
                values.meetingRepetition ===
                MeetingRepetition.AFTER_N_OCCURENCES
                  ? false
                  : true
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
          value={MeetingRepetition.ON_SPECIFIC_DATE}
          colorScheme="purple"
          isDisabled={values.reccuring ? false : true}
        >
          <Text fontSize="sm">{t_option}</Text>
        </Radio>
        <Text
          fontSize="sm"
          color={
            values.reccuring &&
            values.meetingRepetition !== MeetingRepetition.NEVER &&
            values.meetingRepetition !== MeetingRepetition.AFTER_N_OCCURENCES
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
            values.reccuring &&
            values.meetingRepetition !== MeetingRepetition.NEVER &&
            values.meetingRepetition !== MeetingRepetition.AFTER_N_OCCURENCES
              ? false
              : true
          }
          className="custom-calendar"
          value={moment(values.selectedDateFromInput).format('YYYY-MM-DD')}
          onChange={(value) => {
            let newValue = moment(new Date(value));
            setFieldValue('selectedDateFromInput', newValue);
          }}
        />
        {values.reccuring &&
        values.meetingRepetition !== MeetingRepetition.NEVER &&
        values.meetingRepetition !== MeetingRepetition.AFTER_N_OCCURENCES ? (
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
