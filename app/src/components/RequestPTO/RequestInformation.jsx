import { Box, Text } from '@chakra-ui/react';
import styles from './RequestPTO.styles';

export const RequestInformation = ({ status, type, requestedDates, user }) => {
  return (
    <>
      {status === 'pending' ? (
        <>
          <Text {...styles.mainText}>You sent a request for {type}</Text>
        </>
      ) : (
        <>
          {type === 'remote' ? (
            <Text {...styles.mainText}>
              You applied for remote work for{' '}
              <Box as="span" color={'purple.500'}>
                {requestedDates}
              </Box>
            </Text>
          ) : (
            <Text {...styles.mainText}>
              You sent request for {type} to
              <Box as="span" {...styles.adminText}>
                {' '}
                {user?.firstName} {user?.lastName} (ADMIN)
              </Box>
            </Text>
          )}
        </>
      )}
    </>
  );
};
