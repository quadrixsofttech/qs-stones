import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import EmptyInbox from '../../../images/EmptyInbox.png';

const EmptyEmployeeComponent = () => {
  return (
    <Flex flex={1} justify={'center'} align={'center'}>
      <Flex flexDir="column" align={'center'} width={'310px'}>
        <Box width={'200px'}>
          <Image src={EmptyInbox} alt="Empty Inbox" />
        </Box>
        <Text fontWeight={'bold'} color={'gray.700'}>
          User profile is empty
        </Text>
        <Text align={'center'} fontSize={'sm'} color={'gray.700'}>
          All information will be available by clicking on the user from the
          list on the left
        </Text>
      </Flex>
    </Flex>
  );
};

export default EmptyEmployeeComponent;
