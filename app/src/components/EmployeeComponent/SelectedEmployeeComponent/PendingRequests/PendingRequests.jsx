import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import styles from './PendingRequests.styles';

const PendingRequests = () => {
  return (
    <Box {...styles.pendingRequestBox}>
      <Flex
        backgroundColor="gray.200"
        rounded="md"
        height={'100px'}
        mb="2"
      ></Flex>
    </Box>
  );
};

export default PendingRequests;
