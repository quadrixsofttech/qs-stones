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
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { FaRegClock } from 'react-icons/fa';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';

export default function RadioButtonGroup({
  f_option,
  s_option,
  t_option,
  switchIsChecked,
}) {
  const [value, setValue] = React.useState('1');
  const datePickerRefff = React.useRef(null);

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
        <CustomDatePicker format={'MM/DD/YYYY'} />
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
