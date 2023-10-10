import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { RenderRangeTags } from '../../../RequestPTOModal/RenderRangeTags';

const RequestComponent = () => {
  const range = [['1688983401117', '1689156201117']];
  return (
    <Flex backgroundColor="gray.200" rounded="md" mb="2" p="4">
      <Flex flex="1" justify={'space-between'}>
        <Flex flexDir={'column'}>
          <Text>Remote</Text>
          <Flex>
            {range.map((x) => {
              return <RenderRangeTags range={x} key={Math.random()} />;
            })}
          </Flex>
        </Flex>
        <Flex gap="4">
          <Button
            width={'100px'}
            height={'40px'}
            rounded="md"
            backgroundColor="green"
          >
            <Text color="white">Approve</Text>
          </Button>
          <Button
            width={'100px'}
            height={'40px'}
            rounded="md"
            backgroundColor="red"
          >
            <Text color="white">Reject</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default RequestComponent;
