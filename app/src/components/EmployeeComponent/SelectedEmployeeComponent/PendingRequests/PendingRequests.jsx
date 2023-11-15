import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './PendingRequests.styles';
import RequestComponent from './RequestComponent';

const PendingRequests = ({ pendingRequests, refetchPTO, refetchEmployees }) => {
  return (
    <Box {...styles.pendingRequestBox}>
      {pendingRequests?.map((request) => {
        return (
          <RequestComponent
            key={request._id}
            type={request.type}
            range={request.dates}
            createdAt={request.createdAt}
            id={request._id}
            refetchPTO={refetchPTO}
            refetchEmployees={refetchEmployees}
          />
        );
      })}
    </Box>
  );
};

export default PendingRequests;
