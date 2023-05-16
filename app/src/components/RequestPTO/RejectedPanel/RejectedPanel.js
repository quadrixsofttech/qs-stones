import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import styles from '../RequestPTO.styles';

export const RejectedPanel = ({ request }) => {
  return (
    <>
      <Text color={'gray.500'}>{request.requestedDates}</Text>
      <Text fontWeight={'bold'}>
        {request.user.name}
        {' ('}
        {request.user.role}
        {') '}
        <Text fontWeight={'normal'} as="span">
          rejected your Request PTO/Remote
        </Text>
      </Text>
      <>
        <Flex flexDirection={'column'}>
          <Textarea
            mt={2}
            placeholder={request.response}
            width={200}
            height={200}
          />
          <Button {...styles.button}>Send Request Again</Button>
        </Flex>
      </>
    </>
  );
};
