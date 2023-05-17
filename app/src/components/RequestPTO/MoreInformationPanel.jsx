import { Button, Flex, Text, Textarea, Box } from '@chakra-ui/react';
import React from 'react';
import styles from '../RequestPTO/RequestPTO.styles';

export const MoreInformationPanel = ({
  user,
  requestedDates,
  requestStatus,
  response
}) => {
  return requestStatus === 'approved' ? (
    <>
      <Box as="span">
        <Text color={'gray.500'}>{requestedDates}</Text>
        <Text fontWeight={'bold'}>
          {user.name}
          {' ('}
          {user.role}
          {') '}
          <Text fontWeight={'normal'} as="span">
            approved your Request PTO/Remote
          </Text>
        </Text>
      </Box>
    </>
  ) : (
    <Box as="span">
      <Text color={'gray.500'}>{requestedDates}</Text>
      <Text fontWeight={'bold'}>
        {user.name}
        {' ('}
        {user.role}
        {') '}
        <Text fontWeight={'normal'} as="span">
          rejected your Request PTO/Remote
        </Text>
      </Text>
      <>
        <Flex flexDirection={'column'}>
          <Textarea
            mt={2}
            placeholder={response}
            width={200}
            height={200}
          />
          <Button {...styles.button}>Send Request Again</Button>
        </Flex>
      </>
    </Box>
  );
};
