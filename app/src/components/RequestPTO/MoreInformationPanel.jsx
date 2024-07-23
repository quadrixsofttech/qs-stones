import { Button, Flex, Text, Textarea, AccordionPanel } from '@chakra-ui/react';
import React from 'react';
import styles from '../RequestPTO/RequestPTO.styles';

export const MoreInformationPanel = ({
  user,
  requestedDates,
  status,
  response,
  time,
  type,
}) => {
  const userText =
    type === 'remote' ? (
      <Text fontWeight="normal" as="span" fontSize={'0.9rem'}>
        Approved remote request for {requestedDates}
      </Text>
    ) : (
      <Text fontWeight="bold">
        {user?.firstName + ' ' + user?.lastName + ' '}
        <Text fontWeight="normal" as="span" fontSize={'0.9rem'}>
          {status === 'approved' ? 'approved' : 'rejected'} your Request TO for
          {requestedDates}
        </Text>
      </Text>
    );

  return (
    <AccordionPanel {...styles.accordionpanel}>
      <Text color="gray.700">{time}</Text>
      {status === 'pending' ? (
        <Text fontSize={'0.9rem'}>Your Request is pending</Text>
      ) : status !== 'approved' ? (
        <Flex flexDirection="column">
          {userText}
          <Textarea {...styles.textAreaPanel} placeholder={response} />
          <Button {...styles.button}>Send Request Again</Button>
        </Flex>
      ) : (
        <Flex flexDirection="column">{userText}</Flex>
      )}
    </AccordionPanel>
  );
};
