import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export const ApprovedPanel = ({ request }) => {
  return (
    <>
      <Box as="span">
        <Text color={'gray.500'}>{request.requestedDates}</Text>
        <Text fontWeight={'bold'}>
          {request.user.name}
          {' ('}
          {request.user.role}
          {') '}
          <Text fontWeight={'normal'} as="span">
            approved your Request PTO/Remote
          </Text>
        </Text>
      </Box>
    </>
  );
};
