import React from 'react';
import styles from './MyVacationInfo.styles';
import { Box, Divider, Flex, Heading } from '@chakra-ui/react';
import MyVacationInfoBox from './MyVacationInfoBox';

export const MyVacationInfo = () => {
  return (
    <Flex {...styles.mainBox} flexDirection={'column'} width={'742px'}>
      <Box {...styles.header}>
        <Heading {...styles.mainHeading} as="h2">
          My Vacation Info
        </Heading>
      </Box>
      <Flex {...styles.infoBox}>
        <MyVacationInfoBox
          heading={'User Vacation Days to date'}
          numberInfo={'9'}
          footer={'17 days left'}
        />
        <Flex height={'100px'}>
          <Divider orientation="vertical" />
        </Flex>
        <MyVacationInfoBox
          heading={'User Vacation Days to date'}
          numberInfo={'21'}
          footer={'Usable until June next year'}
        />
        <Flex height={'100px'}>
          <Divider orientation="vertical" />
        </Flex>
        <MyVacationInfoBox
          heading={'Unused Vacation Days from last year'}
          numberInfo={'5'}
          footer={'Usable until June this year'}
        />
        <Flex height={'100px'}>
          <Divider orientation="vertical" />
        </Flex>
        <MyVacationInfoBox
          heading={
            <>
              Total Vacation <br /> Days
            </>
          }
          numberInfo={'26'}
          footer={'New and unused days'}
        />
      </Flex>
    </Flex>
  );
};
