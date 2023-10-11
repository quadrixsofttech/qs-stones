import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';

const RequestHistory = () => {
  return (
    <Box {...styles.mainBox}>
      <Flex {...styles.requestHistoryBox}></Flex>
    </Box>
  );
};

export default RequestHistory;
