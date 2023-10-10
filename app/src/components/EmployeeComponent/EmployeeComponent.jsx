import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './EmployeeComponent.styles';
import EmptyInbox from '../../images/EmptyInbox.png';

const EmployeeComponent = ({ name = 'Quadrix Soft' }) => {
  return (
    <Flex {...styles.mainBox}>
      <Heading as="h2" {...styles.header}>
        {name}
      </Heading>
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
    </Flex>
  );
};

export default EmployeeComponent;
