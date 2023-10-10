import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import styles from './PendingRequests.styles';
import RequestComponent from './RequestComponent';

const PendingRequests = () => {
  return (
    <Box {...styles.pendingRequestBox}>
      <RequestComponent />
    </Box>
  );
};

export default PendingRequests;
