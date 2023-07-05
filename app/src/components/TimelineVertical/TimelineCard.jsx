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
  type,
  onEdit,
  onDelete,
  onOpenTimeline,
}) => {
  const [cardHover, setCardHover] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Flex
      {...styles.timelineCard}
      onMouseEnter={() => enabled && setCardHover(true)}
      onMouseLeave={() => enabled && setCardHover(false)}
      onClick={() => onOpenTimeline(id)}
      sx={
        (type === 'small' && {
          justifyContent: 'space-between',
        },
        enabled && {
          _hover: {
            backgroundColor: 'gray.50',
          },
        })
      }
      borderColor={enabled ? color : 'gray'}
    >
      {(cardHover || settingsOpen) && (
        <Box
          {...styles.settingsButtonBox}
          className="settings"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Menu
            onOpen={() => setSettingsOpen(true)}
            onClose={() => setSettingsOpen(false)}
            placement="bottom"
          >
            {type === 'small' && (
              <Tooltip hasArrow label={user.name} placement="top">
                <Avatar size={'xs'} src={user.image} />
              </Tooltip>
            )}
            <Tooltip hasArrow label="Settings" placement="top">
              <MenuButton
                {...styles.settingsButton}
                as={IconButton}
                icon={<BiDotsVerticalRounded />}
              />
            </Tooltip>
            <MenuList minWidth="120px">
              <MenuItem onClick={() => onEdit(id)}>
                <BiEditAlt />
                Edit
              </MenuItem>
              <MenuItem onClick={() => onDelete(id)}>
                <BiTrash />
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
      {type === 'big' ? (
        <>
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
        </>
      ) : (
        <>
          <Heading {...styles.heading} as="h2">
            {title}
          </Heading>
          <Text fontSize={'xs'} color="gray.700">
            {start} - {end}
          </Text>
        </>
      )}
    </Flex>
  );
};

export default TimelineCard;
