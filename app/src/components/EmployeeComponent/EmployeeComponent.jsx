import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from './EmployeeComponent.styles';
import EmptyEmployeeComponent from './EmptyEmployeeComponent/EmptyEmployeeComponent';
import SelectedEmployeeComponent from './SelectedEmployeeComponent/SelectedEmployeeComponent';

const EmployeeComponent = ({
  isClicked,
  name = 'Quadrix Soft',
  paidTimeOff,
}) => {
  return (
    <Flex {...styles.mainBox}>
      {isClicked && (
        <Heading as="h2" {...styles.header}>
          {name}
        </Heading>
      )}

      {isClicked ? (
        <SelectedEmployeeComponent data={paidTimeOff} />
      ) : (
        <EmptyEmployeeComponent />
      )}
      {/* */}
    </Flex>
  );
};

export default EmployeeComponent;
