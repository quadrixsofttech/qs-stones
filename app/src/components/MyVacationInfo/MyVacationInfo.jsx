import styles from './MyVacationInfo.styles';
import { Box, Divider, Flex, Heading, Spinner } from '@chakra-ui/react';
import MyVacationInfoBox from './MyVacationInfoBox';
import useVacation from '../../hooks/useVacation';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';

export const MyVacationInfo = ({
  myInfo = true,
  userid = '',
  refetchMyVacationInfo,
}) => {
  const { user } = useUser();
  let userId;
  myInfo ? (userId = user._id) : (userId = userid);
  const { vacationInfo, isLoading, refetchVacationInfo } = useVacation(userId);

  useEffect(() => {
    refetchVacationInfo();
  }, [refetchMyVacationInfo, refetchVacationInfo]);

  if (isLoading || !vacationInfo) {
    return <Spinner />;
  }

  const currentYear = vacationInfo?.vacation.find(
    (x) => x.year === new Date().getFullYear()
  );
  const lastYear = vacationInfo?.vacation.find(
    (x) => x.year === new Date().getFullYear() - 1
  );

  return (
    <Flex
      {...styles.mainBox}
      rounded={myInfo ? 'md' : ''}
      border={myInfo ? '1px' : '0px'}
      borderTop={'1px'}
      borderColor={'gray.200'}
    >
      {myInfo && (
        <Box {...styles.header}>
          <Heading {...styles.mainHeading} as="h2">
            My Vacation Info
          </Heading>
        </Box>
      )}
      <Flex {...styles.infoBox}>
        <MyVacationInfoBox
          heading={
            <>
              New Vacation Days
              <br />
              from this year
            </>
          }
          numberInfo={currentYear?.initialVacationDays}
          footer={'Usable until June next year'}
        />
        <Divider orientation="vertical" height={'100px'} />
        <MyVacationInfoBox
          heading={
            <>
              Unused Vacation Days
              <br />
              from current year
            </>
          }
          numberInfo={currentYear?.vacationDays}
          footer={`${String(currentYear?.usedDays)} days used`}
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
