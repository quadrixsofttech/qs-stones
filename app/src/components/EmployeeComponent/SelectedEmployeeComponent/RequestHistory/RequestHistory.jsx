import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';
import RequestHistoryComponent from './RequestHistoryComponent';

const RequestHistory = () => {
  return (
    <Box {...styles.mainBox}>
      {/* Izmapiraj podatke koji su approved i rejected */}
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={'2023/10/10 - 2023/10/15'}
        status={'rejected'}
        comment={'Komentar ima'}
      />
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={
          '2023/10/10 - 2023/10/15, 2023/10/10 - 2023/10/15, 2023/10/10 - 2023/10/15, 2023/10/10 - 2023/10/15'
        }
        status={'approved'}
      />
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={'2023/10/10 - 2023/10/15'}
        status={'approved'}
      />
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={'2023/10/10 - 2023/10/15'}
        status={'approved'}
      />
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={'2023/10/10 - 2023/10/15'}
        status={'approved'}
      />
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={'2023/10/10 - 2023/10/15'}
        status={'approved'}
      />
      <RequestHistoryComponent
        createdAt={'2023/10/10 15:15'}
        dates={'2023/10/10 - 2023/10/15'}
        status={'approved'}
      />
    </Box>
  );
};

export default RequestHistory;
