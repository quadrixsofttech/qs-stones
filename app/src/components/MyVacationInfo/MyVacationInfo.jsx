import React from 'react';
import styles from './MyVactionInfo.styles';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

export const MyVacationInfo = () => {
  return (
    <Flex {...styles.mainBox} flexDirection={'column'} width={'742px'}>
      <Box {...styles.header}>
        <Text p="16px" size={'md'} fontWeight={'bold'}>
          My Vacation Info
        </Text>
      </Box>
      <Flex {...styles.infoBox}>
        <Flex {...styles.box}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            User Vacation Days
            <br />
            to date
          </Text>
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            9
          </Text>
          <Text fontSize={'xs'}>17 left</Text>
        </Flex>
        <Flex height={'24'}>
          <Divider orientation="vertical" />
        </Flex>

        <Flex {...styles.box}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            New Vacation Days
            <br />
            from this year
          </Text>
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            21
          </Text>
          <Text fontSize={'xs'}>Usable until June next year</Text>
        </Flex>
        <Flex height={'24'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex {...styles.box}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            Unused Vacation Days
            <br />
            from last year
          </Text>
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            5
          </Text>
          <Text fontSize={'xs'}>Usable until June this year</Text>
        </Flex>
        <Flex height={'24'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex {...styles.box}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            Total Vacation
            <br />
            Days
          </Text>
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            26
          </Text>
          <Text fontSize={'xs'}>New and unused days</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
