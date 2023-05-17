import { Box } from '@chakra-ui/react';
import styles from './RequestStatus.styles';

const RequestStatus = (props) => {
  return <Box color={props.color} bg={props.bg} {...styles.label_status}>{props.name}</Box>;
};

export default RequestStatus;
