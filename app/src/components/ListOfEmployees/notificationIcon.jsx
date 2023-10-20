import { Flex } from '@chakra-ui/react';
import React from 'react';

const NotificationIcon = ({ number }) => {
  return (
    <Flex
      h="22px"
      width={'24px'}
      rounded={'50%'}
      backgroundColor="orange.100"
      alignItems={'center'}
      justifyContent={'center'}
      textColor={'orange.800'}
    >
      {number}
    </Flex>
  );
};

export default NotificationIcon;
