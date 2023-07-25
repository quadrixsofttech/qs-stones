import styles from './MyVacationInfo.styles';
import { Box, Divider, Flex, Heading, Spinner } from '@chakra-ui/react';
import MyVacationInfoBox from './MyVacationInfoBox';
import useVacation from '../../hooks/useVacation';
import useUser from '../../hooks/useUser';

export const MyVacationInfo = () => {
  const { user } = useUser();
  const { vacationInfo, isLoading } = useVacation(user._id);

  if (isLoading || !vacationInfo) {
    return <Spinner />;
  }

  const currentYear = vacationInfo.vacation.find(
    (x) => x.year === new Date().getFullYear()
  );
  const lastYear = vacationInfo.vacation.find(
    (x) => x.year === new Date().getFullYear() - 1
  );

  return (
    <Flex {...styles.mainBox}>
      <Box {...styles.header}>
        <Heading {...styles.mainHeading} as="h2">
          My Vacation Info
        </Heading>
      </Box>
      <Flex {...styles.infoBox}>
        <MyVacationInfoBox
          heading={
            <>
              User Vacation Days
              <br />
              to date
            </>
          }
          numberInfo={currentYear.vacationDays}
          footer={`${String(
            currentYear?.vacationDays - currentYear?.usedDays
          )} days left`}
        />
        <Divider orientation="vertical" height={'100px'} />
        <MyVacationInfoBox
          heading={
            <>
              New Vacation Days
              <br />
              from this year
            </>
          }
          numberInfo={currentYear?.vacationDays || 0}
          footer={'Usable until June next year'}
        />
        <Divider orientation="vertical" height={'100px'} />
        <MyVacationInfoBox
          heading={
            <>
              Unused Vacation Days
              <br />
              from last year
            </>
          }
          numberInfo={lastYear?.vacationDays || 0}
          footer={'Usable until June this year'}
        />
        <Divider orientation="vertical" height={'100px'} />
        <MyVacationInfoBox
          heading={
            <>
              Total Vacation <br /> Days
            </>
          }
          numberInfo={currentYear?.vacationDays + (lastYear?.vacationDays || 0)}
          footer={'New and unused days'}
        />
      </Flex>
    </Flex>
  );
};
