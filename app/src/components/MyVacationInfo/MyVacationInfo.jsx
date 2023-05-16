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
    <Flex {...styles.mainBox}>
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
        <Divider orientation="vertical" height={'100px'} />
        <MyVacationInfoBox
          heading={'New Vacation Days from this year'}
          numberInfo={vacationInfo.NewVacationDaysFromThisYear}
          footer={'Usable until June next year'}
        />
        <Divider orientation="vertical" height={'100px'} />
        <MyVacationInfoBox
          heading={'Unused Vacation Days from last year'}
          numberInfo={vacationInfo.UnusedVacationDaysFromLastYear}
          footer={'Usable until June this year'}
        />
        <Divider orientation="vertical" height={'100px'} />
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
