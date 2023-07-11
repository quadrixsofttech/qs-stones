import {
  Flex,
  Input,
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
        <Input
          placeholder="Select Date"
          size="sm"
          type="date"
          isDisabled={switchIsChecked ? false : true}
          onChange={(event) => setSelectedDate(event.target.value)}
        />
        <Text fontSize="sm" color={switchIsChecked ? 'gray.700' : 'gray.200'}>
          Select time:
        </Text>
        <Flex gap={2}>
          <Input
            placeholder="Select Start Time"
            size="sm"
            type="time"
            isDisabled={switchIsChecked ? false : true}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <Input
            placeholder="Select End Time"
            size="sm"
            type="time"
            isDisabled={switchIsChecked ? false : true}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </Flex>
      </Stack>
    </RadioGroup>
  );
}
