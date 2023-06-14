import { Flex, Heading, Text } from '@chakra-ui/react';
import styles from './TimelineCard.styles';
const TimelineSmallCard = ({
  id,
  enabled,
  title,
  start,
  end,
  description,
  color,
  user,
}) => {
  return (
    <Flex {...styles.timelineSmallCard} borderColor={enabled ? color : 'gray'}>
      <Heading {...styles.heading} as="h2">
        {title}
      </Heading>
      <Text fontSize={'xs'} color="gray.700">
        {start} - {end}
      </Text>
    </Flex>
  );
};
export default TimelineSmallCard;
