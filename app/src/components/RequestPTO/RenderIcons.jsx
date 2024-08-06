import { Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { BiTrash } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';

export const RenderIcons = ({
  id,
  type,
  status,
  time,
  handleOpen,
  handleEdit,
}) => {
  return (
    <>
      <Text {...styles.grayText}>{time}</Text>
      <Spacer />
      {type === 'remote' ? (
        <Icon
          as={BiTrash}
          boxSize={5}
          color={'red.300'}
          onClick={handleOpen}
          _hover={{
            color: 'red.500',
          }}
        />
      ) : status === 'pending' ? (
        <Flex gap={1}>
          <Icon
            as={BsThreeDots}
            boxSize={5}
            onClick={() => handleEdit(id)}
            _hover={{
              color: 'purple.500',
            }}
          />
          <Icon
            as={BiTrash}
            boxSize={5}
            color={'red.300'}
            onClick={handleOpen}
            _hover={{
              color: 'red.500',
            }}
          />
        </Flex>
      ) : (
        ''
      )}
    </>
  );
};
