import { Box, Flex, Image, Select, Text } from '@chakra-ui/react';
import React from 'react';
import EmptyInbox from '../../../images/EmptyInbox.png';
import styles from './SelectedEmployeeComponent.styles';
import { MyVacationInfo } from '../../MyVacationInfo/MyVacationInfo';

const SelectedEmployeeComponent = () => {
  return (
    <Flex flexDir={'column'} height={'100%'}>
      <Flex {...styles.mainBox}>
        <Flex {...styles.messageBox}>
          <Box width={'200px'}>
            <Image src={EmptyInbox} alt="Empty Inbox" />
          </Box>
          <Text fontWeight={'bold'} color={'gray.700'}>
            Your request list is empty
          </Text>
          <Text {...styles.textBox}>
            All incoming requests will be listed in this folder
          </Text>
        </Flex>
      </Flex>
      <Flex flex={1} flexDir={'column'}>
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
        <Flex {...styles.mainBox}>
          <Flex {...styles.messageBox}>
            <Text fontWeight={'bold'} color={'gray.700'}>
              Your requests history list is empty
            </Text>
            <Text {...styles.textBox}>
              All approved/rejected requests will be listed in this folder
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <MyVacationInfo myInfo={false} userid="6454b8dad869b30bf6bad405" />
    </Flex>
  );
};

export default SelectedEmployeeComponent;
