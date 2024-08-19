import React from 'react';
import Navbar from '../../components/Navbar';
import { Flex } from '@chakra-ui/react';

const PublicLayout = ({ children }) => {
  return (
    <Flex flexDir="column">
      <Navbar />
      <Flex h="100%" w="100%" justifyContent={'center'}>
        {children}
      </Flex>
    </Flex>
  );
};

export default PublicLayout;
