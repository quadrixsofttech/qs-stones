import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';
import RequestHistoryComponent from './RequestHistoryComponent';

const RequestHistory = ({ requestHistory }) => {
  return (
    <Box {...styles.mainBox}>
      {requestHistory.map((request) => {
        return (
          <RequestHistoryComponent
            key={request._id}
            createdAt={request.createdAt}
            datesInDays={request.days.length}
            dates={request.dates}
            status={request.status}
            comment={request.comment}
            type={request.type}
          />
        );
      })}
    </Box>
  );
};

export default RequestHistory;
