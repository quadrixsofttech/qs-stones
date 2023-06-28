import {
  Avatar,
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
  orientation = 'vertical',
}) => {
  const [cardHover, setCardHover] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onEdit = () => {
    alert('Edit');
  };
  const onDelete = () => {
    alert('Delete');
  };

  return (
    <Flex
      {...styles.timelineCard}
      onMouseEnter={() => enabled && setCardHover(true)}
      onMouseLeave={() => enabled && setCardHover(false)}
      justifyContent={type === 'small' ? 'space-around' : 'space-between'}
      padding={orientation === 'horizontal' ? 1 : 4}
      paddingLeft={4}
      height={orientation === 'horizontal' ? '96%' : '100%'}
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
        <Flex {...styles.settingsButtonBox} className="settings">
          <Menu
            onOpen={() => setSettingsOpen(true)}
            onClose={() => setSettingsOpen(false)}
            placement="bottom"
          >
            <Flex gap="0.5">
              {type === 'small' && (
                <Tooltip hasArrow label={user.name} placement="top">
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
              <MenuItem onClick={onEdit}>
                <BiEditAlt />
                Edit
              </MenuItem>
              <MenuItem onClick={onDelete}>
                <BiTrash />
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
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
