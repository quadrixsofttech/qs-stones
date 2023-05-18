import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './MyVacationInfo.styles.js';

const MyVacationInfoBox = ({ heading, numberInfo, footer }) => {
  return (
    <Flex {...styles.box}>
      <Heading as="h3" {...styles.heading}>
        {heading}
      </Heading>
      <Text {...styles.numberInfo}>{numberInfo}</Text>
      <Text {...styles.footerInfo}>{footer}</Text>
    </Flex>
  );
};

export default MyVacationInfoBox;
