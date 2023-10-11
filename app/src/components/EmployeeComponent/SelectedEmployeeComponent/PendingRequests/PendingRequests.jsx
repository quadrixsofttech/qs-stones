import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './PendingRequests.styles';
import RequestComponent from './RequestComponent';

const PendingRequests = () => {
  const range = [
    ['1688983401117', '1689156201117'],
    ['1688983401117', '1689156201117'],
  ];
  return (
    <Box {...styles.pendingRequestBox}>
      <RequestComponent
        type="Remote"
        range={range}
        createdAt="2022/10/10 15:15"
      />
      <RequestComponent
        type="Remote"
        range={range}
        createdAt="2022/10/10 15:15"
      />
      <RequestComponent
        type="Remote"
        range={range}
        createdAt="2022/10/10 15:15"
      />
      <RequestComponent
        type="Remote"
        range={range}
        createdAt="2022/10/10 15:15"
      />
    </Box>
  );
};

export default PendingRequests;
