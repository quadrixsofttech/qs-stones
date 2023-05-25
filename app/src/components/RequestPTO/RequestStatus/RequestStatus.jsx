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

const RequestStatusWrapper = ({ status }) => {
  return (
    <RequestStatus
      name={StatusTypes[status].label}
      color={StatusTypes[status].textColor}
      bg={StatusTypes[status].backgroundColor}
    />
  );
};

export default RequestStatusWrapper;
