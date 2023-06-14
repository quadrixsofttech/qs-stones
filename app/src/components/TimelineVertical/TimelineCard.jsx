import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import styles from './TimelineCard.styles';

const TimelineCard = ({
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
    <Flex {...styles.timelineCard} borderColor={enabled ? color : 'gray'}>
      <Flex flexDir={'column'} gap="2">
        <Heading {...styles.heading} as="h2">
          {title}
        </Heading>
        <Text fontSize={'xs'} color="gray.700">
          {start} - {end}
        </Text>
        <Text noOfLines={'2'} fontSize={'xs'} color="gray.700">
          {description}
        </Text>
      </Flex>
      <Flex gap="1" alignItems={'center'}>
        <Avatar size={'xs'} src={user.image} />
        <Text fontSize={'xs'} color="gray.700">
          {user.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TimelineCard;
