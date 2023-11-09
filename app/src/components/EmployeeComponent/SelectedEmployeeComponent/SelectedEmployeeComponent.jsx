import { Flex, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import EmptyInbox from '../../../images/EmptyInbox.png';
import styles from './SelectedEmployeeComponent.styles';
import { MyVacationInfo } from '../../MyVacationInfo/MyVacationInfo';
import EmptyRequest from './EmptyRequest';
import PendingRequests from './PendingRequests/PendingRequests';
import RequestHistory from './RequestHistory/RequestHistory';

const SelectedEmployeeComponent = ({
  data,
  refetchPTO,
  refetchEmployees,
  employeeId,
}) => {
  const [ptoType, setPtoType] = useState('vacation');
  const [requestHistoryData, setRequestHistoryData] = useState(
    data.filter((x) => x.status === 'approved' || x.status === 'rejected')
  );

  const handlePtoTypeChange = (event) => {
    setPtoType(event.target.value);
  };

  useEffect(() => {
    setRequestHistoryData(
      data.filter(
        (x) =>
          x.type === ptoType &&
          (x.status === 'approved' || x.status === 'rejected')
      )
    );
  }, [ptoType, data]);

  const pendingRequests = data.filter((x) => x.status === 'pending');

  return (
    <Flex flexDir={'column'} height={'100%'} overflow={'hidden'}>
      {pendingRequests?.length > 0 ? (
        <PendingRequests
          pendingRequests={pendingRequests}
          refetchPTO={refetchPTO}
          refetchEmployees={refetchEmployees}
        />
      ) : (
        <EmptyRequest
          image={EmptyInbox}
          label={'Your request list is empty'}
          description={'All incoming requests will be listed in this folder'}
        />
      )}
      <Flex flexDir={'column'} overflow={'auto'} height={'30%'}>
        <Flex {...styles.requestHistoryBox}>
          <Text {...styles.text}>Request History</Text>
          <Select
            {...styles.select}
            value={ptoType}
            onChange={handlePtoTypeChange}
          >
            <option key={'Vacation'} value={'vacation'}>
              Vacation
            </option>
            <option key={'Remote'} value={'remote'}>
              Remote
            </option>
          </Select>
        </Flex>
        {data?.length > 0 ? (
          <RequestHistory requestHistory={requestHistoryData} />
        ) : (
          <EmptyRequest
            label={'Your requests history list is empty'}
            description={
              'All approved/rejected requests will be listed in this folder'
            }
          />
        )}
      </Flex>
      <MyVacationInfo myInfo={false} userid={employeeId} />
    </Flex>
  );
};

export default SelectedEmployeeComponent;
