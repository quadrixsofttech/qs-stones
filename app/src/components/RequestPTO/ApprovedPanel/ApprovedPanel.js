import { Text } from '@chakra-ui/react';
import React from 'react';

export const ApprovedPanel = () => {
  return (
    <>
      <Text color={'gray.500'}>23/3/2022</Text>
      <Text fontWeight={'bold'}>
        Milos Stosic(ADMIN) approved
        <Text fontWeight={'normal'} as="span">your Request PTO/Remote</Text>
      </Text>
    </>
  );
};
