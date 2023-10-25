import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import MealStepper from '../../components/MealStepper';
import KitchenFooter from '../../components/KitchenFooter';
import styles from './Kitchen.styles';
import KitchenHeader from '../../components/KitchenHeader';
import { Flex, Heading, Button, Spacer, useSteps } from '@chakra-ui/react';
import { useDisclosure, Text } from '@chakra-ui/react';
import KitchenModalCalendar from '../../components/KitchenModalCalendar';
import moment from 'moment';
import StepByStep from '../../components/StepByStep';

const Kitchen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectDate, setSelectDate] = useState(
    String(new moment().format('YYYY/MM/DD'))
  );
  const [chooseDateValue, setChooseDateValue] = useState(
    JSON.parse(window.localStorage.getItem('selectDate'))
  );

  const steps = [{ title: 'Meal' }, { title: 'Salad' }, { title: 'Review' }];

  const { activeStep, setActiveStep } = useSteps({
    index:  JSON.parse(window.localStorage.getItem('step') || 0),
    count: steps.length,
  });

  const [lclSelectedMeal, setLclSelectedMeal] = useState(
    JSON.parse(window.localStorage.getItem('meal'))
  );

  const [lclSelectedSalad, setLclSelectedSalad] = useState(
    JSON.parse(window.localStorage.getItem('salad'))
  );

  const [bread, setBread] = useState(
    JSON.parse(window.localStorage.getItem('bread') || false)
  );

  console.log(activeStep)
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
      <StepByStep
        activeStep={activeStep}
        lclSelectedMeal={lclSelectedMeal}
        setLclSelectedMeal={setLclSelectedMeal}
        lclSelectSalad={lclSelectedSalad}
        setLclSelectSalad={setLclSelectedSalad}
      />
      <KitchenFooter activeStep={activeStep} setActiveStep={setActiveStep} bread={bread} setBread={setBread} />
    </DashboardLayout>
  );
};

export default Kitchen;
