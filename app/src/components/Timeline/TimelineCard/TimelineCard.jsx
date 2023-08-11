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
  orientation,
  onEdit,
  onDelete,
  onOpen,
}) => {
  const [cardHover, setCardHover] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Flex
      {...styles.timelineCard}
      onMouseEnter={() => enabled && setCardHover(true)}
      onMouseLeave={() => enabled && setCardHover(false)}
      justifyContent={type === 'small' ? 'space-around' : 'space-between'}
      padding={orientation === 'horizontal' ? 1 : 4}
      paddingLeft={4}
      height={orientation === 'horizontal' ? '96%' : '100%'}
      onClick={() => onOpen(id)}
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
            placement="auto"
          >
            <Flex gap="0.5">
              {type === 'small' && (
                <Tooltip hasArrow label={user.firstName} placement="top">
                  <Avatar size={'xs'} src={user.image} />
                </Tooltip>
              )}
              <Tooltip hasArrow label="Settings" placement="top">
                <MenuButton
                  {...styles.settingsButton}
                  as={IconButton}
                  icon={<BiDotsVerticalRounded size="24" />}
                />
              </Tooltip>
            </Flex>

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
            <Text {...styles.description}>{description}</Text>
          </Flex>
          <Flex gap="1" alignItems={'center'}>
            <Avatar size={'xs'} src={user.image} />
            <Text fontSize={'xs'} color="gray.700">
              {user.firstName + ' ' + user.lastName}
            </Text>
          </Flex>
        </>
      ) : (
        <>
          <Tooltip label={title} placement="auto">
            <Heading {...styles.heading} as="h2">
              {title}
            </Heading>
          </Tooltip>
          <Text fontSize={'xs'} color="gray.700">
            {start} - {end}
          </Text>
        </>
      )}
    </Flex>
  );
};

export default TimelineCard;
