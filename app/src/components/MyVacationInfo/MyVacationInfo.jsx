import React from 'react';
import styles from './MyVacationInfo.styles';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import MyVacationInfoBox from './MyVacationInfoBox';
import useVacation from '../../hooks/useVacation';

export const MyVacationInfo = () => {
  const { vacationInfo, isLoading } = useVacation();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
          numberInfo={vacationInfo.VacationDaysToDate}
          footer={`${vacationInfo.VacationDaysLeft} days left`}
        />
        <Flex height={'100px'}>
          <Divider orientation="vertical" />
        </Flex>
        <MyVacationInfoBox
          heading={'New Vacation Days from this year'}
          numberInfo={vacationInfo.NewVacationDaysFromThisYear}
          footer={'Usable until June next year'}
        />
        <Flex height={'100px'}>
          <Divider orientation="vertical" />
        </Flex>
        <MyVacationInfoBox
          heading={'Unused Vacation Days from last year'}
          numberInfo={vacationInfo.UnusedVacationDaysFromLastYear}
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
          numberInfo={vacationInfo.TotalVacationDays}
          footer={'New and unused days'}
        />
      </Flex>
    </Flex>
  );
};
