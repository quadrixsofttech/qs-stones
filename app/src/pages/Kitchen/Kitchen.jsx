import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import KitchenOverview from '../../components/KitchenOverview/KitchenOverview';
import MealStepper from '../../components/MealStepper';
import KitchenFooter from '../../components/KitchenFooter';
import styles from './Kitchen.styles';
import KitchenHeader from '../../components/KitchenHeader';
import { Flex, Heading, Button, Spacer, useSteps } from '@chakra-ui/react';
import { useDisclosure, Text } from '@chakra-ui/react';
import KitchenModalCalendar from '../../components/KitchenModalCalendar/KitchenModalCalendar';
import moment from 'moment';

const Kitchen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectDate, setSelectDate] = useState(
    String(new moment().format('YYYY/MM/DD'))
  );
  const [chooseDateValue, setChooseDateValue] = useState('');
  
  const steps = [{ title: 'Meal' }, { title: 'Salad' }, { title: 'Review' }];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <DashboardLayout>
      <MealStepper steps={steps} activeStep={activeStep} />
      <KitchenHeader onOpen={onOpen} chooseDateValue={chooseDateValue} />
      <KitchenModalCalendar
        isOpen={isOpen}
        onClose={onClose}
        selectDate={selectDate}
        setChooseDateValue={setChooseDateValue}
        setSelectDate={setSelectDate}
      />
      <KitchenOverview />
      <KitchenFooter activeStep={activeStep} setActiveStep={setActiveStep} />
    </DashboardLayout>
  );
};

export default Kitchen;
