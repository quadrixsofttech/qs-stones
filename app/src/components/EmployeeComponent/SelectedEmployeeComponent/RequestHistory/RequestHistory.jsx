import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';
import RequestHistoryComponent from './RequestHistoryComponent';

const RequestHistory = ({ requestHistory }) => {
  return (
    <Box {...styles.mainBox}>
      {/* Izmapiraj podatke koji su approved i rejected */}
      {requestHistory.map((request) => {
        return (
          <RequestHistoryComponent
            key={request._id}
            createdAt={request.createdAt}
            dates={request.dates}
            status={request.status}
            comment={'Komentar ima'}
          />
        );
      })}
    </Box>
  );
};

export default RequestHistory;
