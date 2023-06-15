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
  Tooltip,
} from '@chakra-ui/react';
import styles from './TimelineCard.styles';
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from 'react-icons/bi';
import { useState } from 'react';
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
  const [activeSettings, setActiveSettings] = useState(false);

  const handleMenuClick = () => {
    setActiveSettings(!activeSettings);
  };
  const handleEdit = () => {
    alert('Edit');
  };
  const handleDelete = () => {
    alert('Delete');
  };
  return (
    <Flex {...styles.timelineSmallCard} borderColor={enabled ? color : 'gray'}>
      <Box
        {...styles.settingsButtonBox}
        onClick={handleMenuClick}
        className="settings"
        sx={
          activeSettings ? { visibility: 'visible' } : { visibility: 'hidden' }
        }
      >
        <Tooltip hasArrow label={user.name} placement="top">
          <Avatar size={'xs'} src={user.image} />
        </Tooltip>
        <Menu onClose={handleMenuClick}>
          <Tooltip hasArrow label="Settings" placement="top">
            <MenuButton
              {...styles.settingsButton}
              as={IconButton}
              icon={<BiDotsVerticalRounded />}
            />
          </Tooltip>
          <MenuList minWidth="120px">
            <MenuItem onClick={handleEdit}>
              <BiEditAlt />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <BiTrash />
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

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