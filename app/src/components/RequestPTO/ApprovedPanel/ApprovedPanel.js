import { Text } from '@chakra-ui/react';
import React from 'react';
import employees from '../../MyHistory/information';

export const ApprovedPanel = () => {
  return (
    <>
      <Text color={'gray.500'}>{employees.requestDate}</Text>
      <Text fontWeight={'bold'}>
        {employees.admin[Math.floor(Math.random() * employees.admin.length)]}(ADMIN) approved
        <Text fontWeight={'normal'}>your Request PTO/Remote</Text>
      </Text>
    </>
  );
};
