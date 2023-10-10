import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './EmployeeComponent.styles';
import EmptyEmployeeComponent from './EmptyEmployeeComponent/EmptyEmployeeComponent';

const EmployeeComponent = ({ name = 'Quadrix Soft' }) => {
  return (
    <Flex {...styles.mainBox}>
      <Heading as="h2" {...styles.header}>
        {name}
      </Heading>
      <EmptyEmployeeComponent />
    </Flex>
  );
};

export default EmployeeComponent;
