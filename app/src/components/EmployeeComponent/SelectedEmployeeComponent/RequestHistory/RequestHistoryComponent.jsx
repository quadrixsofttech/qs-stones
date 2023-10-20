import { Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './RequestHistory.styles';
import RequestStatusWrapper from '../../../RequestPTO/RequestStatus/RequestStatus';
import { BiCommentDetail } from 'react-icons/bi';

const RequestHistoryComponent = ({ createdAt, dates, comment, status }) => {
  return (
    <Flex {...styles.requestHistoryBox}>
      <Flex height={'100%'} alignItems="center">
        <Text {...styles.createdAt}>{createdAt}</Text>
        <Divider {...styles.divider} />
        {/* Ovde izmapiraj dates, i formatiraj YYYY/MM/DD */}
        <Text {...styles.dates}>{dates}</Text>
      </Flex>
      <Flex {...styles.statusBox}>
        {comment && <BiCommentDetail size="20" />}
        <RequestStatusWrapper status={status} />
      </Flex>
    </Flex>
  );
};

export default RequestHistoryComponent;
