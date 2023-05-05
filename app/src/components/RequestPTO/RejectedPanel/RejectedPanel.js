import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import styles from '../RequestPTO.styles';

export const RejectedPanel = () => {
  return (
    <>
      <Text color={'gray.500'}>23/3/2022</Text>
      <Text fontWeight={'bold'}>
        Milos Stosic(ADMIN) rejected
        <Text fontWeight={'normal'}>your Request PTO/Remote</Text>
        <Flex flexDirection={'column'}>
          <Textarea mt={2} placeholder="Explanation" width={200} />
          <Button {...styles.button}>Send Request Again</Button>
        </Flex>
      </Text>
    </>
  );
};
