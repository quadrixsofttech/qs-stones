import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

const RequestHistory = () => {
  return (
    <Box flexDir={'column'} p="2" height={'100%'} overflowY="auto">
      <Flex
        backgroundColor="gray.200"
        rounded="md"
        height={'100px'}
        mb="2"
      ></Flex>
    </Box>
  );
};

export default RequestHistory;
