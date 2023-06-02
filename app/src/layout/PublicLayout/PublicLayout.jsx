import React from 'react';
import Navbar from '../../components/Navbar';
import { Flex } from '@chakra-ui/react';

const PublicLayout = ({ children }) => {
  return (
    <Flex flexDir="column">
      <Navbar />
      <Flex flex={1} mt={14}>
        {children}
      </Flex>
    </Flex>
  );
};

export default PublicLayout;
