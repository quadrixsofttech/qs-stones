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

export default function RadioButtonGroup({ f_option, s_option, t_option }) {
  const [value, setValue] = React.useState('1');
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack mt={1}>
        <Radio size="sm" value="first" colorScheme="purple" defaultChecked>
          <Text fontSize="sm">{f_option}</Text>
        </Radio>
        <Radio size="sm" value="second" colorScheme="purple">
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
        <Radio size="sm" value="third" colorScheme="purple">
          <Text fontSize="sm">{t_option}</Text>
        </Radio>
        <Input
          placeholder="Select Date and Time"
          size="sm"
          type="datetime-local"
        />
      </Stack>
    </RadioGroup>
  );
}
