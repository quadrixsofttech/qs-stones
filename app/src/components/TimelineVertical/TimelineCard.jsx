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
  const [cardHover, setCardHover] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Flex
      {...styles.timelineCard}
      onMouseEnter={() => enabled && setCardHover(true)}
      onMouseLeave={() => enabled && setCardHover(false)}
      sx={
        enabled && {
          _hover: {
            backgroundColor: 'gray.50',
          },
        }
      }
      borderColor={enabled ? color : 'gray'}
    >
      {(cardHover || settingsOpen) && (
        <Box {...styles.settingsButtonBox} className="settings">
          <Menu
            onOpen={() => setSettingsOpen(true)}
            onClose={() => setSettingsOpen(false)}
            placement="bottom"
          >
            <Tooltip hasArrow label="Settings" placement="top">
              <MenuButton
                {...styles.settingsButton}
                as={IconButton}
                icon={<BiDotsVerticalRounded />}
              />
            </Tooltip>
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
      )}

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
