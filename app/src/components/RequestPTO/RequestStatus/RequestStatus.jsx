import { Box } from '@chakra-ui/react';
import styles from './RequestStatus.styles';
import StatusTypes from '../status';

const RequestStatus = ({ name, color, bg }) => {
  return (
    <Box color={color} bg={bg} {...styles.labelStatus}>
      {name}
    </Box>
  );
};

const RequestStatusWrapper = ({ status, type }) => {
  return (
    <RequestStatus
      name={type === 'remote' ? 'APPROVED' : StatusTypes[status].label}
      color={type === 'remote' ? 'green.800' : StatusTypes[status].textColor}
      bg={type === 'remote' ? 'green.100' : StatusTypes[status].backgroundColor}
    />
  );
};

export default RequestStatusWrapper;
