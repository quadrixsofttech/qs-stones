import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import styles from './TimelineCard.styles';
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from 'react-icons/bi';
import { useState } from 'react';

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
  const [activeSettings, setActiveSettings] = useState(false);
  const handleMenuClick = () => {
    setActiveSettings(!activeSettings);
  };
  return (
    <Flex {...styles.timelineCard} borderColor={enabled ? color : 'gray'}>
      <Box
        {...styles.settingsButtonBox}
        onClick={handleMenuClick}
        className="settings"
        sx={
          activeSettings ? { visibility: 'visible' } : { visibility: 'hidden' }
        }
      >
        <Menu onClose={handleMenuClick}>
          <MenuButton
            {...styles.settingsButton}
            as={IconButton}
            icon={<BiDotsVerticalRounded />}
          />
          <MenuList minWidth="120px">
            <MenuItem>
              <BiEditAlt />
              Edit
            </MenuItem>
            <MenuItem>
              <BiTrash />
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
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
