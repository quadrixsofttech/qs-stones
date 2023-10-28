import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import MealStepper from '../../components/MealStepper';
import KitchenFooter from '../../components/KitchenFooter';
import KitchenHeader from '../../components/KitchenHeader';
import { useSteps } from '@chakra-ui/react';
import { useDisclosure, Flex } from '@chakra-ui/react';
import KitchenModalCalendar from '../../components/KitchenModalCalendar';
import moment from 'moment';
import StepByStep from '../../components/StepByStep';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Kitchen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectDate, setSelectDate] = useState(
    new moment().format('YYYY/MM/DD')
  );
  const [chooseDateValue, setChooseDateValue] = useState(
    JSON.parse(window.localStorage.getItem('selectDate')) || ''
  );

  const steps = [{ title: 'Meal' }, { title: 'Salad' }, { title: 'Review' }];

  const { activeStep, setActiveStep } = useSteps({
    index: JSON.parse(window.localStorage.getItem('step') || 0),
    count: steps.length,
  });

  const [lclSelectedMeal, setLclSelectedMeal] = useState(
    JSON.parse(window.localStorage.getItem('meal')) || ''
  );

  const [lclSelectedSalad, setLclSelectedSalad] = useState(
    JSON.parse(window.localStorage.getItem('salad')) || ''
  );

  const [bread, setBread] = useState(
    JSON.parse(window.localStorage.getItem('bread') || false)
  );

  const order = {
    'main dish': lclSelectedMeal,
    'salad': lclSelectedSalad,
    'bread': bread,
    'date': chooseDateValue,
  };
  
  return (
    <DashboardLayout>
      <Flex flexDir="column" flexGrow={1} height={'100%'}>
        <MealStepper steps={steps} activeStep={activeStep} />
        <KitchenHeader
          onOpen={onOpen}
          chooseDateValue={chooseDateValue}
          activeStep={activeStep}
        />
        <KitchenModalCalendar
          isOpen={isOpen}
          onClose={onClose}
          selectDate={selectDate}
          setChooseDateValue={setChooseDateValue}
          setSelectDate={setSelectDate}
        />
        <Scrollbars style={{ height: '100%' }}>
          <StepByStep
            activeStep={activeStep}
            lclSelectedMeal={lclSelectedMeal}
            setLclSelectedMeal={setLclSelectedMeal}
            lclSelectSalad={lclSelectedSalad}
            setLclSelectSalad={setLclSelectedSalad}
            date={chooseDateValue}
            bread={bread}
          />
        </Scrollbars>
        <KitchenFooter
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          bread={bread}
          setBread={setBread}
          disabled={activeStep === 3 || lclSelectedMeal === ''}
          date={chooseDateValue}
        />
      </Flex>
    </DashboardLayout>
  );
};

export default Kitchen;
