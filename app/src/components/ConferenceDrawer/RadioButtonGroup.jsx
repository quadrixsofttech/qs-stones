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
  const [value, setValue] = React.useState('1');
  const datePickerRef = React.useRef(null);

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack mt={1}>
        <Radio
          size="sm"
          value="first"
          colorScheme="purple"
          defaultChecked
          isDisabled={switchIsChecked ? false : true}
        >
          <Text fontSize="sm">{f_option}</Text>
        </Radio>
        <Radio
          size="sm"
          value="second"
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
          value="third"
          colorScheme="purple"
          isDisabled={switchIsChecked ? false : true}
        >
          <Text fontSize="sm">{t_option}</Text>
        </Radio>
        <Text fontSize="sm" color={switchIsChecked ? 'gray.700' : 'gray.200'}>
          Select date:
        </Text>
        <DatePicker
          ref={datePickerRef}
          disabled={switchIsChecked ? false : true}
          className="custom-calendar"
          format="MM/DD/YYYY"
          calendarPosition="right"
        />
        {switchIsChecked ? (
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
        <Text fontSize="sm" color={switchIsChecked ? 'gray.700' : 'gray.200'}>
          Select starting time:
        </Text>
        <CustomTimePicker switchIsChecked={switchIsChecked} />
        <Text fontSize="sm" color={switchIsChecked ? 'gray.700' : 'gray.200'}>
          Select ending time:
        </Text>
        <CustomTimePicker switchIsChecked={switchIsChecked} />
      </Stack>
    </RadioGroup>
  );
}
