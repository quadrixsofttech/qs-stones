import React, { useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import KitchenOverview from '../../components/KitchenOverview/KitchenOverview';
import MealStepper from '../../components/MealStepper';
import styles from './Account.styles';
import { Flex, Heading , Button, Spacer, Checkbox} from '@chakra-ui/react';

const Account = () => {

  return (
    <DashboardLayout>
    <MealStepper />
     <Flex>
        <Heading size="2xl" ml="14px">
          Choose dish
        </Heading>
        <Spacer />
        <Button
         {...styles.buttonChooseDay}
        >
          Choose day
        </Button>
      </Flex>
      <KitchenOverview/>
      <Flex>
        <Checkbox colorScheme='purple' ml="17px" size="lg">
          Bread
        </Checkbox>
      </Flex>
    </DashboardLayout>
  );
};

export default Account;
