import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';
import styles from './PendingRequests.styles';

const RequestComponent = ({ type, range, createdAt, id }) => {
  return (
    <Flex {...styles.requestBox}>
      <Flex {...styles.infoBox}>
        <Flex flexDir={'column'} gap="1">
          <Text fontWeight={'600'} color={'gray.700'}>
            {type}
          </Text>
          <Flex flexWrap={'wrap'}>
            {range.map((x) => {
              return (
                <RenderRangeTags
                  range={x}
                  key={Math.random()}
                  showClose={false}
                />
              );
            })}
          </Flex>
        </Flex>
        <Flex gap="4">
          <Button {...styles.approveButton}>
            <Text color="white">Approve</Text>
          </Button>
          <Button {...styles.rejectButton}>
            <Text color="white">Reject</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex p="2" justify={'flex-end'}>
        <Text color="gray.400" fontSize={'xs'}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};
export default RequestComponent;
