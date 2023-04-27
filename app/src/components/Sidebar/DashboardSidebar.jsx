import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { BiSwim, BiMicrophone, BiDish } from 'react-icons/bi';

export default function DashboardSidebar() {
  return (
    <Flex flexDirection={'column'}>
      <Flex
        as={NavLink}
        to={'/dashboard'}
        bgColor={'blackAlpha.100'}
        margin={25}
        _active={alert('active')}
      >
        <BiSwim color="black" />
        <Text>PTO</Text>
      </Flex>
      <Flex
        as={NavLink}
        to={'/conference'}
        bgColor={'blackAlpha.100'}
        margin={25}
      >
        <BiMicrophone color="black" />
        <Text>Conference</Text>
      </Flex>
      <Flex as={NavLink} to={'/Kitchen'} bgColor={'blackAlpha.100'} margin={25}>
        <BiDish color="black" />
        <Text>Kitchen</Text>
      </Flex>
    </Flex>
  );
}
