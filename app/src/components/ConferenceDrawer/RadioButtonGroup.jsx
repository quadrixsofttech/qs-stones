import {
  Box,
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
import { AiTwotoneCalendar } from 'react-icons/ai';

function CustomMultipleInput({ openCalendar, value, iconName }) {
  return (
    <Box onClick={openCalendar}>
      <input
        value={value}
        style={{ border: '1px solid gray', borderRadius: '0.2em' }}
      />
      <Icon
        as={iconName}
        boxSize={'4'}
        style={{ position: 'relative', right: '1.2em', top: '0.1em' }}
      />
    </Box>
  );
}

export default function RadioButtonGroup({
  f_option,
  s_option,
  t_option,
  switchIsChecked,
  setStartTime,
  setEndTime,
  setSelectedDate,
}) {
  const [value, setValue] = React.useState('1');

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
          render={(value, openCalendar) => {
            return (
              <CustomMultipleInput
                value={value}
                openCalendar={openCalendar}
                iconName={AiTwotoneCalendar}
              />
            );
          }}
          className="custom-calendar"
          onChange={setSelectedDate}
          disabled={switchIsChecked ? false : true}
        />
        <Text fontSize="sm" color={switchIsChecked ? 'gray.700' : 'gray.200'}>
          Select starting time:
        </Text>
        <DatePicker
          className="custom-calendar"
          disabled={switchIsChecked ? false : true}
          disableDayPicker
          format="HH:mm"
          position="top"
          plugins={[
            <TimePicker
              mStep={15}
              hideSeconds
              onChange={(event) => setStartTime(event.target.value)}
            />,
          ]}
        />
        <Text fontSize="sm" color={switchIsChecked ? 'gray.700' : 'gray.200'}>
          Select ending time:
        </Text>
        <DatePicker
          className="custom-calendar"
          disabled={switchIsChecked ? false : true}
          disableDayPicker
          format="HH:mm"
          position="top"
          plugins={[
            <TimePicker
              mStep={15}
              hideSeconds
              onChange={(event) => setEndTime(event.target.value)}
            />,
          ]}
        />
      </Stack>
    </RadioGroup>
  );
}
