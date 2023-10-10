import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './EmployeeComponent.styles';
import EmptyEmployeeComponent from './EmptyEmployeeComponent/EmptyEmployeeComponent';
import SelectedEmployeeComponent from './SelectedEmployeeComponent/SelectedEmployeeComponent';

const EmployeeComponent = ({ name = 'Quadrix Soft' }) => {
  return (
    <Flex {...styles.mainBox}>
      <Heading as="h2" {...styles.header}>
        {name}
      </Heading>
      <EmptyEmployeeComponent />
      {/* <SelectedEmployeeComponent /> */}
    </Flex>
  );
};

export default EmployeeComponent;
