import { Text } from '@chakra-ui/react';
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
              <Text color={'purple.500'}>{requestedDates}</Text>
            </Text>
          ) : (
            <Text {...styles.mainText}>
              You sent request for {type} to
              <Text {...styles.adminText} as="span">
                {' '}
                {user?.firstName} {user?.lastName} (ADMIN)
              </Text>
            </Text>
          )}
        </>
      )}
    </>
  );
};
