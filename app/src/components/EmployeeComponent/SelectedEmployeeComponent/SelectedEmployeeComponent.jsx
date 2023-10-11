import { Flex, Select, Text } from '@chakra-ui/react';
import React from 'react';
import EmptyInbox from '../../../images/EmptyInbox.png';
import styles from './SelectedEmployeeComponent.styles';
import { MyVacationInfo } from '../../MyVacationInfo/MyVacationInfo';
import EmptyRequest from './EmptyRequest';
import PendingRequests from './PendingRequests/PendingRequests';
import RequestHistory from './RequestHistory/RequestHistory';

const SelectedEmployeeComponent = ({ data }) => {
  return (
    <Flex flexDir={'column'} height={'100%'} overflow={'hidden'}>
      {data ? (
        <PendingRequests />
      ) : (
        <EmptyRequest
          image={EmptyInbox}
          label={'Your request list is empty'}
          description={'All incoming requests will be listed in this folder'}
        />
      )}
      <Flex flexDir={'column'} overflow={'auto'} height={'37%'}>
        <Flex {...styles.requestHistoryBox}>
          <Text {...styles.text}>Request History</Text>
          <Select {...styles.select}>
            <option key={'Vacation'} value={'Vacation'}>
              Vacation
            </option>
            <option key={'Remote'} value={'Remote'}>
              Remote
            </option>
          </Select>
        </Flex>
        {/* <EmptyRequest
          label={'Your requests history list is empty'}
          description={
            'All approved/rejected requests will be listed in this folder'
          }
        /> */}
        <RequestHistory />
      </Flex>
      <MyVacationInfo myInfo={false} userid="6454b8dad869b30bf6bad405" />
    </Flex>
  );
};

export default SelectedEmployeeComponent;
