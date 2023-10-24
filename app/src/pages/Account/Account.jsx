import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import KitchenOverview from '../../components/KitchenOverview/KitchenOverview';
import MealStepper from '../../components/MealStepper';
import styles from './Account.styles';
import {
  Flex,
  Heading,
  Button,
  Spacer,
  Checkbox,
  Container,
  Stack,
} from '@chakra-ui/react';
import { useDisclosure, Text } from '@chakra-ui/react';
import KitchenModalCalendar from '../../components/KitchenModalCalendar/KitchenModalCalendar';
import moment from 'moment';

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectDate, setSelectDate] = useState(
    String(new moment().format('YYYY/MM/DD'))
  );
  const [chooseDateValue, setChooseDateValue] = useState('');

  return (
    <DashboardLayout>
      <MealStepper />
      <Flex>
        <Heading size="2xl" ml="14px" positon="fixed">
          Choose dish
        </Heading>
        <Spacer />
        <Text mr="12px" fontWeight="bold" fontSize="30px">
          {chooseDateValue}
        </Text>
        <Button {...styles.buttonChooseDay} onClick={onOpen}>
          Choose day
        </Button>
      </Flex>
      <KitchenModalCalendar
        isOpen={isOpen}
        onClose={onClose}
        selectDate={selectDate}
        setChooseDateValue={setChooseDateValue}
        setSelectDate={setSelectDate}
      />
      <KitchenOverview />

      <Flex as="footer" py={{ md: '6' }} w="100%">
        <Checkbox colorScheme="purple" ml="17px" size="lg">
          Bread
        </Checkbox>
        <Spacer />
        <Button colorScheme="purple">Next</Button>
      </Flex>
    </DashboardLayout>
  );
};

export default Account;
