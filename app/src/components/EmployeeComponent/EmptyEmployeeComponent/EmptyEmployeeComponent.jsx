import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import EmptyInbox from '../../../images/EmptyInbox.png';
import styles from './EmptyEmployeeComponent.styles';

const EmptyEmployeeComponent = () => {
  return (
    <Flex {...styles.mainBox}>
      <Flex {...styles.messageBox}>
        <Box width={'200px'}>
          <Image src={EmptyInbox} alt="Empty Inbox" />
        </Box>
        <Text fontWeight={'bold'} color={'gray.700'}>
          User profile is empty
        </Text>
        <Text {...styles.textBox}>
          All information will be available by clicking on the user from the
          list on the left
        </Text>
      </Flex>
    </Flex>
  );
};

export default EmptyEmployeeComponent;
