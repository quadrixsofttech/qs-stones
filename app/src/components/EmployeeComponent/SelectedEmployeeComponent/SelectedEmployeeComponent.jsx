import { Flex, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import EmptyInbox from '../../../images/EmptyInbox.png';
import styles from './SelectedEmployeeComponent.styles';
import { MyVacationInfo } from '../../MyVacationInfo/MyVacationInfo';
import EmptyRequest from './EmptyRequest';
import PendingRequests from './PendingRequests/PendingRequests';
import RequestHistory from './RequestHistory/RequestHistory';

const SelectedEmployeeComponent = ({ data }) => {
  const [ptoType, setPtoType] = useState('Vacation');

  const handlePtoTypeChange = (event) => {
    setPtoType(event.target.value);
  };

  return (
    <Flex flexDir={'column'} height={'100%'} overflow={'hidden'}>
      {data.length > 0 ? (
        <PendingRequests />
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
            <option key={'Vacation'} value={'Vacation'}>
              Vacation
            </option>
            <option key={'Remote'} value={'Remote'}>
              Remote
            </option>
          </Select>
        </Flex>
        {data.length > 0 ? (
          <RequestHistory />
        ) : (
          <EmptyRequest
            label={'Your requests history list is empty'}
            description={
              'All approved/rejected requests will be listed in this folder'
            }
          />
        )}
      </Flex>
      <MyVacationInfo myInfo={false} userid="6454b8dad869b30bf6bad405" />
    </Flex>
  );
};

export default SelectedEmployeeComponent;
