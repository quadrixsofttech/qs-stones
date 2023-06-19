import styles from './TimelineHorizontal.styles';
import { Text } from '@chakra-ui/react';

const TimelineHorizontal = ({ title, data }) => {
  return (
    <Text fontSize="xl">
      <Text as="span" fontSize="xs" borderBottom={'1px solid black'}>
        03
      </Text>{' '}
      Conference
    </Text>
  );
};
export default TimelineHorizontal;
