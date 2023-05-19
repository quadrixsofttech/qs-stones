import { Button, Flex, Text, Textarea, AccordionPanel } from '@chakra-ui/react';
import React from 'react';
import styles from '../RequestPTO/RequestPTO.styles';

export const MoreInformationPanel = ({
  user,
  requestedDates,
  status,
  response,
  time,
}) => {
  const userText = (
    <Text fontWeight="bold">
      {user.name} ({user.role}){' '}
      <Text fontWeight="normal" as="span">
        {status === 'approved' ? 'approved' : 'rejected'} your Request
        PTO/Remote
      </Text>
    </Text>
  );

  return (
    <AccordionPanel {...styles.accordionpanel}>
      <Text color="gray.500">{time}</Text>
      {status === 'pending' ? (
        <Text>Your Request is pending</Text>
      ) : status !== 'approved' ? (
        <Flex flexDirection="column">
          {userText}
          <Textarea mt={2} placeholder={response} width={200} height={200} />
          <Button {...styles.button}>Send Request Again</Button>
        </Flex>
      ) : (
        <Flex flexDirection="column">{userText}</Flex>
      )}
    </AccordionPanel>
  );
};
